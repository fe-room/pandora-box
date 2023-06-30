import { ScrollView, Text, View } from '@tarojs/components'
import { Empty } from '@nutui/nutui-react-taro';
import './index.scss'
const Index = (props) => {
    const { dataList, RenderItem, scrollViewHeight, onScrollToLower, dataCount } = props
    const hasMore = dataList.length < dataCount;
    return (<ScrollView className="taro-list" style={scrollViewHeight} scrollY  onScrollToLower={onScrollToLower}>
         { dataList.length ? dataList.map((item, index) => {
                 return (<RenderItem item={item} key={index}></RenderItem>)
         }) : <Empty description={'暂无数据'}></Empty>}
        {!hasMore && <View className='flex-center taro-list-nomore' >没有更多了~</View>}
    </ScrollView>)
}

export default Index