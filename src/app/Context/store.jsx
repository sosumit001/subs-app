'use client'

import { useContext, useState, createContext } from "react"

const GlobalContext = createContext()
export const GlobalContextProvider=({children})=>{
    const [toPass, setToPass] = useState({
        duration: '',
        licensePrice: 0,
        name: '',
        durationPrice: 0
      })
    
    return <>
    <GlobalContext.Provider value={{toPass, setToPass}}>
        {children}
    </GlobalContext.Provider>
         
    </>
}

export const useGlobalContext = () => useContext(GlobalContext)
