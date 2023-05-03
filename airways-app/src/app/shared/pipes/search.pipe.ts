import { Pipe, PipeTransform } from '@angular/core';
import { ISelectAirport } from '../models/interfaces/select-airport-interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(airports: ISelectAirport[], searchText: string) {
    if (airports) {
      if (airports.length === 0 || searchText === '') {
        return airports;
      } else {
        return airports.filter((airport) =>
        airport.city.toLowerCase().includes(searchText.toLowerCase()) ||
      airport.key.toLowerCase().includes(searchText.toLowerCase()));
      }
    }
    return airports;
  }
}
