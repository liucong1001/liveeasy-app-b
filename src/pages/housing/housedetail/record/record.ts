import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import {RecordProvider} from '../../providers/record/record';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from '@angular/common/http';
import {ConfigProvider} from "../../providers/config/config";
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient,
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

}

