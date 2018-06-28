import { Component, ViewChild } from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams, Slides} from 'ionic-angular';
import {RecordProvider} from '../../../../providers/record/record';
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
import {HttpClient} from '@angular/common/http';
import {ConfigProvider} from "../../../../providers/config/config";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
/**
 * Generated class for the RecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
})
export class RecordPage {
  @ViewChild(Slides) slides: Slides;
  index: number = 0;
  followUp:any;
  lookEmpty:any;
  id:any;
  nones=false;
  have=false;
  propertyid:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient, public nativePageTransitions: NativePageTransitions,
              public  recordprovider: RecordProvider,public localStorageProvider: LocalStorageProvider,
              public  configProvider:ConfigProvider) {
    this.propertyid = navParams.get('propertyid');
    this.recordprovider.getRecord(this.propertyid).then(res => {
      console.log(res);
        this.followUp = res.data.propFollowupInfos;
        this.lookEmpty=res.data.propEmptyLookInfos;
    });
  }
  imgHeader:string; //线上图片默认头地址
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    console.log('ionViewDidLoad RecordPage');
    this.imgHeader = this.configProvider.set().img;
  }
  //添加active
  goToSlide(index) {
    this.slides.slideTo(index, 500);
    this.addActive(index);
  }
  // 滑动切换
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    // console.log(currentIndex);
    this.addActive(currentIndex);
  }
  // 改变tab 颜色
  addActive(index) {
    this.index = index;
    // console.log(index)
  }


  pic(data){
    return JSON.parse(data)[0].thumbnail
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
}

