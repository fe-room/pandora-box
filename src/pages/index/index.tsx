import { useState, useCallback, useEffect, memo } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import { Swiper,SwiperItem, Tabs, Empty } from '@nutui/nutui-react-taro';
import './index.scss'

const Index = () => {

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
  

  const getData = useCallback(() => {
    const datas: string[] = []
    const pageSize = 10
    const dataCount = 90
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
  
  const ItemRender = ({ data }: any) => {
    return <div style={itemStyle}>{data}</div>
  }
  const ItemRenderMemo = memo(ItemRender)

  const onScroll = useCallback(() => {
    setpageNo((pageNo) => pageNo + 1);
  }, []);

  const onChange = (e) => {
    // do something
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
          <Image className='home-swiper-img' src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"  />
        </SwiperItem>
        <SwiperItem >
          <Image className='home-swiper-img' src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg"  />
        </SwiperItem>
      </Swiper>
      <Tabs value={tabvalue} onChange={({ paneKey }) => {
        setTabvalue(paneKey)
      }} type="smile" >
        {
          tabList.map((item,index)=> {
            return  (<Tabs.TabPane  key={index}  title={item.title} >
              <ScrollView
                style={{ height: 'calc(100vh - 340px)'}}
                scrollY
                onScrollToLower={onScroll}
              >
                { dataList.map((it) => {
                 return (<ItemRenderMemo data={it}></ItemRenderMemo>)
                })}
              </ScrollView>
            </Tabs.TabPane>)
          })
        }
      </Tabs>
    </View>
  )
}

export default Index;
