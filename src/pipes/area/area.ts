import { Pipe, PipeTransform } from '@angular/core';
import {CustomerProvider} from "../../providers/customer/customer";

/**
  区域pipe  用于客源地区转换
 */
@Pipe({
  name: 'area',
})
export class AreaPipe implements PipeTransform {

  constructor(private customerProvider:CustomerProvider) {
  }

  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {

    this.customerProvider.area().then(res=>{
         for(var i=0;i++;i<res.length){
            if(value==res[i].code){
              return res[i].name;
            }
         }
    });
    // return value.toLowerCase();
  }
}
