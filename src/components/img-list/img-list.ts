import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ConfigProvider} from "../../providers/config/config";

/**
   图片展示组件
 */
@Component({
  selector: 'img-list',
  templateUrl: 'img-list.html'
})
export class ImgListComponent {

  imgHeader: string; //线上图片默认头地址
  @Input() imgJson: any;
  imgJsonArry = [];
  // imgJsonString:any;
  constructor( public configProvider: ConfigProvider) {
    if(this.imgJson){
      this.imgJsonArry = JSON.parse(this.imgJson);
      console.log('组件图',this.imgJsonArry);
    }
    this.imgHeader = this.configProvider.set().img;
  }

}
