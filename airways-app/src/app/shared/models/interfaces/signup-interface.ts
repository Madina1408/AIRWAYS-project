export interface ISignUpRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    countryCode: string;
    phone: string;
    citizenship: string;
}

export interface ISignUpResponse {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    countryCode: string,
    phone: string,
    citizenship: string
}