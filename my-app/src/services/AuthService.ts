import $api from "../http";
import axios, {AxiosResponse} from 'axios';
import { AuthResponse } from "../models/types";
import { StringDataType } from "sequelize/types";
const config = require('config');
const API_URL = config.get('API_URL');

export default class AuthService {
    static async loginSevice(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {email, password})
    }

    static async registrationService(login: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', {login, email, password})
    }

    static async logoutService(): Promise<AxiosResponse<string>> {
        return $api.get('/logout')
    }
    static async checkService(): Promise<AxiosResponse<AuthResponse>>{
    return await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
    }
}

