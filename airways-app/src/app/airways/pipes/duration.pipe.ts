import { Pipe,  PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements  PipeTransform{
  transform(value: number): string {
    if(value > 0 && value/60 < 1) {
      return value + 'm';

    } else {
      return (value/60).toFixed() + 'h' + ' '+ value%60 + 'm';
    }
 }
}