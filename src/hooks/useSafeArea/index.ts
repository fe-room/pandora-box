import { useState, useEffect }  from 'react'
import { getSystemInfoSync } from '@tarojs/taro'

const useSafeArea = ()=> {
    const [safeArea, setSafeArea] = useState(0)
    useEffect(()=> {
        const windowInfo = getSystemInfoSync()
        if(windowInfo.safeArea && windowInfo.screenHeight) {
            setSafeArea(windowInfo.screenHeight - windowInfo.safeArea.bottom)
        }
    }, [])
    return  safeArea
}

export default useSafeArea