export interface IPassenger {
    type: string;
    age: string;
    count: number;
    taxBase:number;
}

export interface IPassengerData {
    index: number;
    type: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateBirth: string;
    needAssistance?: boolean;
    needCheckedBaggage?: boolean;
}

export interface IPassengerContacts {
    countryName: string;
    countryCode: string;
    phoneNumber: string;
    email: string;
}

export interface IPassengerInfo {
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    countryCode: string,
    phone: string,
    citizenship: string
}
