import { useState, useCallback, useEffect, memo } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import TaroList from '@/components/taro-list'
import { Swiper,SwiperItem, Tabs } from '@nutui/nutui-react-taro';
import { navigateTo } from '@tarojs/taro'

import './index.scss'

const Index = () => {
  console.log('father')
  const tabList = [
    {
      title: '收藏',
      key: '0',
    },
    {
      title: '全部',
      key: '1',
    },
    {
      title: '写作',
      key: '2',
    },
    {
      title: '生活',
      key: '3',
    },
    {
      title: '解惑',
      key: '4',
    }
  ]
  const [tabvalue, setTabvalue] = useState('0');
  const [dataList, setdataList] = useState<string[]>([])
  const [pageNo, setpageNo] = useState(1)
  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50px',
    background: '#eeeeee',
    borderRadius: '10px',
    marginBottom: '20rpx'
  }
  const dataCount = 20
  const getData = useCallback(() => {
    const datas: string[] = []
    const pageSize = 10
    if(dataList.length < dataCount) {
      for (let i = 0; i < pageSize; i++) {
        datas.push(`${i+ dataList.length} Item`)
    }
    setdataList((dataList) => {
        return [...dataList, ...datas]
    })
    }
  }, [pageNo])

  useEffect(() => {
    getData()
  }, [pageNo])
  
  const renderItem = ({ item }: any) => {
    return <div style={itemStyle}>{item}</div>
  }
  const renderItemMemo = memo(renderItem)

  const onScroll = useCallback(() => {
    setpageNo((pageNo) => pageNo + 1);
  }, []);

  const onChange = (e) => {
    // do something
  }

  const onClick = () => {
    console.log('gotoChat')
    navigateTo({
      url: '/second-packages/pages/chat-room/index'
    })
  }

  return (
    <View className='home'> 
      <Swiper
        paginationColor="#426543"
        autoPlay="5000"
        initPage="0"
        paginationVisible
        onChange={onChange}
      >
        <SwiperItem >
          <Image onClick={onClick} className='home-swiper-img' src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"  />
        </SwiperItem>
      </Swiper>
      <Tabs value={tabvalue} onChange={({ paneKey }) => {
        setTabvalue(paneKey)
      }} type="smile" >
        {
          tabList.map((item,index)=> {
            return  (<Tabs.TabPane  key={index}  title={item.title} >
                <TaroList onScrollToLower={onScroll} dataCount={dataCount} scrollViewHeight={{ height: 'calc(100vh - 340px)'}} dataList={dataList} RenderItem={renderItemMemo}></TaroList>
            </Tabs.TabPane>)
          })
        }
      </Tabs>
    </View>
  )
}

export default Index;
