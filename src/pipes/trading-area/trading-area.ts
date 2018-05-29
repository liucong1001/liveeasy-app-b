import { Pipe, PipeTransform } from '@angular/core';

/**
  商圈pipe  用于客源地区转换
 */
@Pipe({
  name: 'tradingArea',
})
export class TradingAreaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
