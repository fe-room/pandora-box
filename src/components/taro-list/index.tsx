import { ScrollView, Text, View } from '@tarojs/components'
import { Empty } from '@nutui/nutui-react-taro';
import './index.scss'
const Index = (props) => {
    const { dataList, RenderItem, scrollStyle, onScrollToLower, dataCount, hideEmpty } = props
    const hasMore = dataList.length < dataCount;
    return (<ScrollView  className="taro-list" style={scrollStyle} scrollY  onScrollToLower={onScrollToLower}>
         { dataList.length ? dataList.map((item, index) => {
                 return (<RenderItem item={item} key={index}></RenderItem>)
         }) : hideEmpty ? '' : <Empty description={'暂无数据'}></Empty>}
        { !hasMore && dataList.length ? <View className='flex-center taro-list-nomore' >没有更多了~</View> : ''}
    </ScrollView>)
}

export default Index