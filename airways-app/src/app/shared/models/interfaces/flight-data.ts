export interface IGotFlightData {
  available: number;
  flightNumber: string;
  timeMins: number;
  takeoffDate: string;
  landingDate: string;
  prices: {
    [key: string]: {
      eur: number;
      usd: number;
      rub: number;
      pln: number;
    };
  };
  price: {
    eur: number;
    usd: number;
    rub: number;
    pln: number;
  };
}

export interface IGotFlightDataList{
  data: IGotFlightData[];
}