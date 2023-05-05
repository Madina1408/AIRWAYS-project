export interface IPostFlightData {
  fromKey: string;
  toKey: string;
  forwardDate: string;
  backDate?: string;
}

export interface IRecieveFormData{
  fromKey: string;
  toKey: string;
  forwardDate: string;
  backDate: string;
  passengers:string
}