



import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "./userActions";


const initialState={
    isLoading:false,
userData:{ }
}

export const userSlice = createSlice({

    name:"userSlice",
    initialState:initialState,
    reducers:{

    },
    extraReducers:(builder)=>{

        builder.addCase(getUserData.pending,(state,{payload})=>{
     state.isLoading = true
        })
        builder.addCase(getUserData.fulfilled,(state,{payload})=>{
                //   console.log(payload)
                  state.userData = payload
                  state.isLoading = false
        })
        builder.addCase(getUserData.rejected,(state,{payload})=>{
state.isLoading
        })
    }
})


export default userSlice.reducer