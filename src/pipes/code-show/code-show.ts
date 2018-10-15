import { Pipe, PipeTransform } from '@angular/core';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {ArryCodeValuePipe} from "../arry-code-value/arry-code-value";

/**
   codeShow 将码值 val 转换为name
 */
@Pipe({
  name: 'codeShow',
})
export class CodeShowPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor( public localStorageProvider: LocalStorageProvider,){
  }
  transform(value: string, ...args) {

    const  attrName = args[0];
    const  attr_name = attrName.replace(/([A-Z])/g,"_$1").toLowerCase();
    const  localCode = this.localStorageProvider.get('codeData');
    const  json= new ArryCodeValuePipe().transform(localCode,attr_name);
    for(var item of  json){
      if(value==item.val){
        return item.name
      }
  }
  }


}
