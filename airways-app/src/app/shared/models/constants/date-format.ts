import { IFormat } from "../interfaces/format-interface";

const dateFormatMenu: IFormat[] = [
    { label: 'MM/DD/YYYY', selected: true },
    { label: 'DD/MM/YYYY', selected: false },
    { label: 'YYYY/DD/MM', selected: false },
    { label: 'YYYY/MM/DD', selected: false },
];

export default dateFormatMenu;