import { ISelectFormat } from "../../../shared/models/interfaces/select-format-interface";

const dateFormatMenu: ISelectFormat[] = [
    { label: 'MM/DD/YYYY', selected: true },
    { label: 'DD/MM/YYYY', selected: false },
    { label: 'YYYY/DD/MM', selected: false },
    { label: 'YYYY/MM/DD', selected: false },
];

export default dateFormatMenu;