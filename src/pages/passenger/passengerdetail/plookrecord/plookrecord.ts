import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import { AccomplishPage } from '../../mypassenger/accomplish/accomplish';
import { CloseprivateguestPage } from '../../mypassenger/closeprivateguest/closeprivateguest';
import { AddpassengerPage } from '../../addpassenger/addpassenger';
import {ToastComponent} from "../../../../components/toast/toast";
import {CustomerProvider} from "../../../../providers/customer/customer";
import {ClosePage} from "./close/close";

/**
 * Generated class for the PlookrecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plookrecord',
  templateUrl: 'plookrecord.html',
})
export class PlookrecordPage {
  @ViewChild(Slides) slides: Slides;
  index: number = 0;
  lRecord:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public customerProvider:CustomerProvider,
              public toast:ToastComponent,) {
    this.customerProvider.mfollow({}).then(res => {
      console.log(res.data.result);
      this.lRecord=res.data.result
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlookrecordPage');
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
  accomplish(){
    this.navCtrl.push(AccomplishPage)
  }
  close(){
    this.navCtrl.push(ClosePage)
  }
  addHouse(){
    this.navCtrl.push(AddpassengerPage)
  }
}
