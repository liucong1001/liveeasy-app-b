import { Component,ViewChild  } from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams, Slides} from 'ionic-angular';
import {HousedetailPage} from "../housedetail/housedetail";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

/**
房源详情页面
 */

@IonicPage()
@Component({
  selector: 'page-housinfo',
  templateUrl: 'housinfo.html',
})
export class HousinfoPage {
  data:any;
  @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,public nativePageTransitions: NativePageTransitions) {
    this.data=navParams.get('propertyId');
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HousinfoPage');
  }
  @ViewChild('mySlider') slider:Slides;
  mySlideOptions={
    autoplay:2000,
    initialSlide:0,
    pager:true,
    loop:true,
    speed:300
  };


  ngOnInit(){//页面加载完成后自己调用
    setInterval(()=>{
      this.slider.slideNext(300,true);
    },2000);
  }
  edit(){
    this.openWin(HousedetailPage)
  }


  //------返回处理--------//
  backButtonClick = (e: UIEvent) => {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: 3,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options)
      .then()
      .catch();
    this.navCtrl.pop({animate:false});
  }

  //------跳转页面过渡--------//
  openWin(goPage, param = {}) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage, param, {animate:false});
  }

}
