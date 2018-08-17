import { Pipe, PipeTransform } from '@angular/core';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the CityPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'cityPipe',
})
export class CityPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor( public localStorageProvider: LocalStorageProvider,){

  }
  transform(value: string, ...args) {
    for(var item of this.localStorageProvider.get('area')){
        if (value==item.code){
          return item.name;
        }else {
          return '';
        }
    }
    }
}
