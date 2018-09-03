import { Component ,ViewChild} from '@angular/core';
import {AlertController, Events, IonicPage, Navbar, NavController, NavParams, Slides} from 'ionic-angular';
import { CloseprivateguestPage } from '../../../mypassenger/closeprivateguest/closeprivateguest';
import { AddpassengerPage } from '../../../mypassenger/addpassenger/addpassenger';
import {ToastComponent} from "../../../../../components/toast/toast";
import {CustomerProvider} from "../../../../../providers/customer/customer";
import {ClosePage} from "./close/close";
import {PassengerdetailPage} from "../passengerdetail";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {PublicpassengerPage} from "../../../publicpassenger/publicpassenger";
import {PublicpdetailPage} from "../../../publicpassenger/publicpdetail/publicpdetail";
import {SearchhousePage} from "../../../../housing/housedetail/searchhouse/searchhouse";
import {el} from "@angular/platform-browser/testing/src/browser_util";

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
  statusOne=[];
  statusTwo=[];
  statusThree=[];
  ss=false;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,public nativePageTransitions: NativePageTransitions,public statusBar: StatusBar, public navParams: NavParams,public customerProvider:CustomerProvider,
              public toast:ToastComponent,private alertCtrl: AlertController, public events: Events) {
    this.customerid=navParams.get('id').customerId;
    this.getRecords(this.customerid);
  }

  getRecords(customerid){
    this.params = {customerId:customerid};
    this.customerProvider.mfollow(1,{customer:this.params}).then(res => {
      this.lRecord=res.data.result;
    });
  }



//状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {

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
        message: '确定完成吗？',
        buttons: [
          {
            text: '取消',
            role: '取消',
            handler: () => {
              console.log('Cancel clicked');

            }
          },
          {
            text: '完成',
            handler: () => {
              console.log('Buy clicked');
              //完成约看——状态
              this.customerProvider.mfinish(item.followupId,2,'',this.customerid).then(res => {
                console.log(res);
                if(res.success){
                  this.toast.msg('完成成功');
                  setTimeout(()=>{
                    this.navCtrl.pop();
                  },200);

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
    this.events.subscribe('bevents', (params) => {
       console.log('接收数据为: ', params);
       this.getRecords(params);
      // 取消订阅
      this.events.unsubscribe('bevents');
    });
     this.navCtrl.push(ClosePage,{ item:item,customerId:this.customerid})
  }
  addHouse(){
    this.openWin(AddpassengerPage)
  }

  //是否存在“约看中”的记录
  isHasLooking(data){
      if(data){
        var arry = [];
        for(var item of data){
          if(item.followStatus==1){
             arry.push(item);
          }
        }
        if(arry.length>=1){
          return false
        }else {
          return true
        }
      }
  }

  //已完成
  isHasFinish(data){
    if(data){
      var arry = [];
      for(var item of data){
        if(item.followStatus==2){
          arry.push(item);
        }
      }
      if(arry.length>=1){
        return false
      }else {
        return true
      }
    }
  }

  //已关闭
  isHasClose(data){
    if(data){
      var arry = [];
      for(var item of data){
        if(item.followStatus==3){
          arry.push(item);
        }
      }
      if(arry.length>=1){
        return false
      }else {
        return true
      }
    }
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
