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

export interface IPassengersSummaryList {
    passengers: IPassengerData[];
    contactDetails: IPassengerContacts;
}