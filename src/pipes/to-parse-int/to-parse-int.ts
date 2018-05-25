import { Pipe, PipeTransform } from '@angular/core';

/**
 * 取整数-pipe
 */
@Pipe({
  name: 'toParseInt',
})
export class ToParseIntPipe implements PipeTransform {

  transform(value: string, ...args) {
    return parseInt(value);
  }
}
