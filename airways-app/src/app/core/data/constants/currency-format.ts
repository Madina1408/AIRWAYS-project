import { ISelectFormat } from "../../../shared/models/interfaces/select-format-interface";

const currencyFormatMenu: ISelectFormat[] = [
    { label: 'EUR', sign: '€' },
    { label: 'USA', sign: '$' },
    { label: 'RUB', sign: '₽' },
    { label: 'PLN', sign: 'zł' },
];

export default currencyFormatMenu;