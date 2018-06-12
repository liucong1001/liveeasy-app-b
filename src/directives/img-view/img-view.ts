import { Directive,ElementRef, Input, HostListener } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
   app点击图片放大指令部分
 */
@Directive({
  selector: '[img-view]' // Attribute selector
})

export class ImgViewDirective {
  private el:HTMLElement;
  public  path = '';
  constructor(el:ElementRef,private photoViewer: PhotoViewer) {
  }
  @HostListener('click',['$event.target']) onClick(evt){
    // console.log('详情imgView',evt,evt.getAttribute('src'));
    var img_sm = evt.getAttribute('src');
    var img_big= img_sm.split("?")[0];
    this.photoViewer.show(img_big);
  }


}
