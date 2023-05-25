export interface IGotFlightData {
  completed?:boolean;
  seats: {
    total: number;
    avaible: number;
  };
  flightNumber: string;
  timeMins: number;
  form: {
    key: string;
    name: string;
    city: string;
    gmt: string;
    country: string;
  };
  to: {
    key: string;
    name: string;
    city: string;
    gmt: string;
    country: string;
  };
  takeoffDate: string;
  landingDate: string;
  price: {
    eur: number;
    usd: number;
    rub: number;
    pln: number;
  };
  otherFlights?: {
    [key: string]: IGotFlightData;
  };
}

export interface IGotFlightDataList{
  data: IGotFlightData[];
}