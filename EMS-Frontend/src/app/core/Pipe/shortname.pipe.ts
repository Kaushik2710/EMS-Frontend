import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortname',
  standalone: true,
})
export class ShortnamePipe implements PipeTransform {
  transform(value: string): string {
    const valArray: string[] = value.split(' ');
    if (value.length <= 20) {
      return value;
    } else {
      return valArray[0];
    }
  }
}
