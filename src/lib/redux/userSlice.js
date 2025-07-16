



import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "./userActions";


const initialState={
userData:{name:"Aaron Penumallu",icon:'https://cdni.iconscout.com/illustration/premium/thumb/gamer-illustration-download-in-svg-png-gif-file-formats--professional-avatar-different-profession-career-tag-12-pack-industry-illustrations-10492786.png'}
}

export const userSlice = createSlice({

    name:"userSlice",
    initialState:initialState,
    reducers:{

    },
    extraReducers:(builder)=>{

        builder.addCase(getUserData.pending,(state,{payload})=>{

        })
        builder.addCase(getUserData.fulfilled,(state,{payload})=>{
                //   console.log(payload)
                  state.userData = payload
        })
        builder.addCase(getUserData.rejected,(state,{payload})=>{

        })
    }
})


export default userSlice.reducer