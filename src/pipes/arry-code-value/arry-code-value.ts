import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ArryCodeValuePipe pipe.
 *  将后台取到的value数组转换，
 *   [{name:'',data:[{label:'',value,:''}]}]   ==> [{name:'',data:[{name:'',val,:''}]}]
 */
@Pipe({
  name: 'arryCodeValue',
})
export class ArryCodeValuePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, attr:any, ...args) {
       var data = [];
       for(var i in value){
          if(attr==value[i]['name']){
             var arry = value[i]['data'];
             for (var y in arry){
                data.push({name:arry[y]['label'],val:arry[y]['value']})
             }
          }
       }
       return data;
  }
}
