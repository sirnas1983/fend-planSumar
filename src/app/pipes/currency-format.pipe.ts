import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number): string {
    return '$ ' + this.decimalPipe.transform(value, '1.2-2', 'es') ; // Añade el símbolo de la moneda al final
  }

}
