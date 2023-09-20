import {useState, useEffect} from 'react'

function UseMultiPage(steps:[]) {
    const [count, setCount] = useState<number>(0)

    const next=()=>{
        setCount((count)=>(count%steps.length))
    }
    const back=()=>{
        setCount((count)=>(count-1))
    }
   
    
  return [count, next, back]
}

export default UseMultiPage