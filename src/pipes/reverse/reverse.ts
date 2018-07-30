import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ReversePipe pipe.
 *
 * 倒叙排列 ，按照key
 */
@Pipe({
  name: 'reversePipe',
})
export class ReversePipe implements PipeTransform {
  transform(value: any,key:string, ...args) {
    if(value){
      console.log('asd',value);
      return value.sort(function (a,b) {
        var x = parseFloat(a[key]);
        var y = parseFloat(b[key]);
        return ((x<y)?-1:((x>y)?1:0));
      })
    }
  }
}
