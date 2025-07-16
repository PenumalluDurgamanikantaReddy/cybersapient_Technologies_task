

import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'


export const cyberspaientStore=configureStore({
    reducer:{
    user:userReducer

    }
})

