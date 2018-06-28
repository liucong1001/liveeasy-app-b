import { Component ,ViewChild} from '@angular/core';
import {AlertController, IonicPage, Navbar, NavController, NavParams, Slides} from 'ionic-angular';
import { CloseprivateguestPage } from '../../../mypassenger/closeprivateguest/closeprivateguest';
import { AddpassengerPage } from '../../../mypassenger/addpassenger/addpassenger';
import {ToastComponent} from "../../../../../components/toast/toast";
import {CustomerProvider} from "../../../../../providers/customer/customer";
import {ClosePage} from "./close/close";
import {PassengerdetailPage} from "../passengerdetail";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

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
  customerid:any;
  params:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,public nativePageTransitions: NativePageTransitions, public navParams: NavParams,public customerProvider:CustomerProvider,
              public toast:ToastComponent,private alertCtrl: AlertController) {
    this.customerid=navParams.get('id').customerId;
    console.log(this.customerid)
    this.params = {customerId:this.customerid}
      this.customerProvider.mfollow(1,{customer:this.params}).then(res => {
        console.log(res.data.result);
        this.lRecord=res.data.result
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlookrecordPage');
    this.navBar.backButtonClick = this.backButtonClick;
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
  // accomplish(){
  //   this.navCtrl.push(AccomplishPage)
  // }
  data:any;
    confirm(item) {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: '关闭吗？',
        buttons: [
          {
            text: '关闭',
            role: '关闭',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '确定',
            handler: () => {
              console.log('Buy clicked');
              //完成约看——状态
              this.customerProvider.mfinish(item.followupId,2,'').then(res => {
                console.log(res);
                if(res.success){
                  this.toast.msg('完成成功');
                  // window.location.reload(false);
                  // this.navCtrl.push(PassengerdetailPage)
                  this.navCtrl.pop();
                }else {
                  this.toast.error('完成失败')
                }
              });
            }
          }
        ]
      });
      alert.present();
    }

  close(item){
    this.navCtrl.push(ClosePage,{
item:item,
    })
  }
  addHouse(){
    this.navCtrl.push(AddpassengerPage)
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
