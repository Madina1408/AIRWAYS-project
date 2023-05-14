export interface ISearchFlight {
    fromKey: string;
    fromCity: string;
    toKey: string;
    toCity: string;
    forwardDate?: string;
    backDate?: string;
    passengers: string;
}