import { useState, useEffect}  from 'react'
import { TextArea } from '@nutui/nutui-react-taro';
import { EventSourcePolyfill } from "event-source-polyfill";
import { uuid } from '@/utils/tools'

interface Message {
  id: number;
  text: string;
}
interface EventSourcePolyfillConfig {
  headers?: { [key: string]: string };
  withCredentials?: boolean;
}


function useEventSource(url: string, options?: EventSourcePolyfillConfig ) {
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
    const [chatText,setchatText] = useState('')

    const change = (value: any, event: Event) => {
        setchatText(value)
    }
    useEventSource(`${BASE_URL}/createSse`, {
      headers: {
          uid: uuid()
      }
    })
    return <>
      <TextArea 
       defaultValue={chatText}
       onChange={(value, event) => {
        change(value, event)
    }}
      ></TextArea>
    </>
}

export default Index