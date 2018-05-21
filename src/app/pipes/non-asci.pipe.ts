import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nonasci'
})
export class NonAsciPipe implements PipeTransform {

  transform(value: any, ...args): any {
    if (value) {
      return value.replace(/[^a-zA-Z0-9 ]/g, '');
    }
    return '';
  }
}
