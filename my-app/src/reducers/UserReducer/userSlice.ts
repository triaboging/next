import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
//import build from "next/dist/build";
import { AuthResponse, IUser } from "../../models/types";
import AuthService from '../../services/AuthService'
import { checkAuth, login, registration } from "./userActionCreators";
interface UserState{
    user: IUser;
    loading: boolean;
    error: string 
}
const initialState:UserState = {
    user:{ email: '',
        isActivated: false,
        id: '',
        login: '',
        role: 'USER'},
    loading: false,
    error: '',
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{

    },
    extraReducers:{
        [checkAuth.pending.type]: (state)=>{
            state.loading = true ;
            },
        [checkAuth.fulfilled.type]: (state, action: PayloadAction<AuthResponse>)=>{
            state.user = action.payload.userData;
            state.loading = false;
            localStorage.setItem('token', action.payload.accessToken)
            },
        [checkAuth.rejected.type]: (state,  action: PayloadAction<string>) => {
               state.loading = false;
               state.error = action.payload
             },
        [registration.pending.type]: (state)=>{
                state.loading = true ;
                },
        [registration.fulfilled.type]: (state, action: PayloadAction<AuthResponse>)=>{
                    state.user = action.payload.userData;
                    state.loading = false;
                    localStorage.setItem('token', action.payload.accessToken)
                },
    }

})
export default userSlice.reducer;