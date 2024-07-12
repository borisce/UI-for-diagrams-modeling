import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  constructor() {
  }

  public transform(value: number, param?: string): string {
    let str: string = '';
    if (value > 0 && param === 'with_sign') {
      str += '+';
    }
    str += value.toLocaleString('sk-SK', {
      style: 'currency',
      currency: 'EUR'
    });
    return str;
  }
}
