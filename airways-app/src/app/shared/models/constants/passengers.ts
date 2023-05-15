import { IPassenger } from "src/app/shared/models/interfaces/passengers-interface";

const passengersList: IPassenger[] = [
    { type: 'Adults', age: '14+ years', count: 1 },
    { type: 'Child', age: '2-14 years', count: 0 },
    { type: 'Infant', age: '0-2 years', count: 0 },
];

export default passengersList;