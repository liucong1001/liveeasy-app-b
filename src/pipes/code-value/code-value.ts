import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CodeValuePipe pipe.
 *
 * radis码值转换
 */
@Pipe({
  name: 'codeValue',
})
export class CodeValuePipe implements PipeTransform {
  transform(value: any, ...args) {
    var arry=[];
    for(var i in value){
      arry.push({name:value[i],val: i });
    }
    return  arry;
  }
}
