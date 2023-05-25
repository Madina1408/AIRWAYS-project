export interface IUserData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  countryCode: string;
  phone: string;
  citizenship: string;
}

export interface IUserDataCopy {
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  country: string;
  phoneNumber: string;
  citizenship: string;
  login:string;
  password:string;
}

export interface IRecieveUserData{
  id:string;
  createDate:string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  country: string;
  phoneNumber: string;
  citizenship: string;
  login:string;
  password:string;
}
