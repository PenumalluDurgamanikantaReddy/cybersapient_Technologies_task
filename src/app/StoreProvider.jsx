'use client'


import { useRef } from "react"
import { Provider } from "react-redux"
import { cyberspaientStore } from '../lib/redux/store'


export default function storeProvider({children}){


    // const storeRef = useRef(null)
    // if(!storeRef.current){
    //    storeRef.current = cyberspaientStore
    // }

    return <Provider store={cyberspaientStore}>{children}</Provider>
}