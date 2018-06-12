import {Directive, HostListener, Input} from '@angular/core';
import {GalleryModal} from "ionic-gallery-modal";
import { ModalController } from 'ionic-angular';
import {ConfigProvider} from '../../providers/config/config'
/**
   画廊
 */
@Directive({
  selector: '[imgGallery]' // Attribute selector
})
export class ImgGalleryDirective {

  private el:HTMLElement;
  /**
   *   object = {
       data:Array,   默认对象
       index:Number,
  }
  */

  @Input() imgGallery:any;
  imgHeader: string; //线上图片默认头地址
  constructor(private modalCtrl:ModalController,public configProvider: ConfigProvider,) {
    this.imgHeader = this.configProvider.set().img;
  }

  @HostListener('click',['$event.target']) onClick(evt){
   this.gallery(this.imgGallery.data,this.imgGallery.index);
  }

  gallery(data,index){
    var photos = [];
    for(var i in data){
      photos.push({url:this.imgHeader+data[i].imagePath})
    }
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: photos,
      initialSlide: index
    });
    modal.present();
  }
}
