export interface IUser {
    email: string ;
    isActivated: boolean;
    id: string ;
    login: string ;
    role: string;
}

export interface AuthResponse {
    accessToken: string;
    //refreshToken: string;
    userData: IUser;
    //message: string;
}
