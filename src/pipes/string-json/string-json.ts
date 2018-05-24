import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the StringJsonPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'stringJson',
})
export class StringJsonPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {

    var jsonObj= JSON.parse(value);
    var imgpath='';
    if(jsonObj.length>0){
      for(var i=0;i<jsonObj.length;i++){
        if(jsonObj[i]['imagePath']!=='undefined'){
          imgpath = jsonObj[0].imagePath;
          console.log('图片',jsonObj[0].imagePath);
        }

      }
    }
    return imgpath;
  }
}
