import { Email } from "@material-ui/icons"
import { createAsyncThunk } from "@reduxjs/toolkit"
import AuthService from "../../services/AuthService"
interface regProps{
    login: string,
    email: string,
    password: string
}
interface regProps{
    email: string,
    password: string
}
export const checkAuth = createAsyncThunk(
    '/user/checkAuth',
    async(_, thunkApi)=>{
        try{
            const response = await AuthService.checkService()
            return response.data
        }catch(e){
            return thunkApi.rejectWithValue("ошибка авторизации!")
        }
    }
)
export const registration = createAsyncThunk(
    '/user/registration',
    async({login, email, password}:regProps ,thunkApi)=>{
        try{
            const response = await AuthService.registrationService( login, email, password)
            return response.data
        }catch(e){
            return thunkApi.rejectWithValue("ошибка авторизации!")
        }
})
export const login = createAsyncThunk(
    '/user/login',
    async({email, password}:regProps ,thunkApi)=>{
        try{
            const response = await AuthService.loginSevice(email, password)
            return response.data
        }catch(e){
            return thunkApi.rejectWithValue("ошибка аутентификации!")
        }
})
export const logout = createAsyncThunk(
    '/user/logout',
    async(_ ,thunkApi)=>{
        try{
            const response = await AuthService.logoutService()
            return response.data
        }catch(e){
            return thunkApi.rejectWithValue("ошибка logout!")
        }
})
