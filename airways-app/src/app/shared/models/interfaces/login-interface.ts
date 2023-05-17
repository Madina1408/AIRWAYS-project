export interface ILogInRequest {
    email: string;
    password: string;
}

export interface ILogInResponse {
    token: string;
}