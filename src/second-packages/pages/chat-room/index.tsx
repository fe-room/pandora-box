import { useState, useEffect, memo}  from 'react'
import TaroList from '@/components/taro-list'
import { TextArea, Button } from '@nutui/nutui-react-taro';
import { EventSourcePolyfill, EventSourcePolyfillInit } from "event-source-polyfill";
import { View, Image } from '@tarojs/components'
import { uuid } from '@/utils/tools'
import { useSafeArea } from '@/hooks/index';
import './index.scss'

interface Message {
  id: number;
  text: string;
}


function useEventSource(url: string, options?: EventSourcePolyfillInit ) {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const source = new EventSourcePolyfill(url, options);
    source.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data) as Message;
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    return () => {
      source.close();
    };
  }, [url]);

  return messages;
}


const Index = () => {
    const safeHeight = useSafeArea()
    const [chatText,setchatText] = useState('')
    const change = (value: any, event: Event) => {
        setchatText(value)
    }
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
    const [dataList, setdataList] = useState<string[]>([])
    
    const renderItem = ({ item }: any) => {
      return <div style={itemStyle}>{item}</div>
    }
    const renderItemMemo = memo(renderItem)
    // useEventSource(`${BASE_URL}/createSse`, {
    //   headers: {
    //       uid: uuid()
    //   }
    // })
    return <View className="chat-room">
      <TaroList  hideEmpty={true} scrollStyle={{  height: `calc(100vh - ${safeHeight + 100}px)` , background: '#FAFAFA'}}  dataList={dataList} RenderItem={renderItemMemo}></TaroList>
      <View className='flex-row item-center' style={{paddingBottom: safeHeight + 'px'}}> 
        <TextArea 
          style={{height: '80px', background: '#FAFAFA', padding: '20px'}}
          defaultValue={chatText}
          placeholder={'请输入想要问的内容'}
          onChange={(value, event) => {
            change(value, event)
        }}
          ></TextArea>
        <Button type="info" style={{marginRight: '20px'}}>发送</Button>
      </View>
    </View>
}

export default Index