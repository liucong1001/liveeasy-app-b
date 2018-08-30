import {Directive, HostListener, Input} from '@angular/core';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {NavController} from "ionic-angular";

/**
 * Generated class for the OpenWinDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[openWin]' // Attribute selector
})
export class OpenWinDirective {
  @Input() openWin:any;  // 注意： 此名字 和 selector名字保持一样
  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,) {
    console.log('Hello OpenWinDirective Directive');
  }
  @HostListener('click',['$event.target']) onClick(evt){
    this.openWinPage(this.openWin.url,this.openWin.params);
  }

  //------跳转页面过渡--------//
  openWinPage(goPage, param = {}) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50,
       androiddelay  :  100,
      slidePixels:20,
      fixedPixelsTop:0,
      fixedPixelsBottom:0
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage, param, {animate:false});
  }

}
