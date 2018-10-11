import { Component ,ViewChild} from '@angular/core';
import {AlertController, IonicPage, Navbar, NavController, NavParams, Slides} from 'ionic-angular';
import { AddpassengerPage } from '../../../mypassenger/addpassenger/addpassenger';
import {ToastComponent} from "../../../../../components/toast/toast";
import {CustomerProvider} from "../../../../../providers/customer/customer";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {PublicpdetailPage} from "../../../publicpassenger/publicpdetail/publicpdetail";
import {PubliclosePage} from './publiclose/publiclose';
/**
 * Generated class for the PlookrecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-publiclook',
  templateUrl: 'publiclook.html',
})
export class PubliclookPage {
  @ViewChild(Slides) slides: Slides;
  index: number = 0;
  lRecord:any;
  customerid:any;
  params:any;
  statusOne=[];
  statusTwo=[];
  statusThree=[];
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,public nativePageTransitions: NativePageTransitions,public statusBar: StatusBar, public navParams: NavParams,public customerProvider:CustomerProvider,
              public toast:ToastComponent,private alertCtrl: AlertController) {
    this.customerid=navParams.get('customerId');
    this.getRecords(this.customerid);
    // console.log(navParams.get('type'))
  }



  getRecords(customerid){
    if(this.navParams.get('type')=='99'){
      this.params={
        customerId:customerid,
        customerStatus: '3',
        customerType: '2',
      };
      this.method();

    }else if(this.navParams.get('type')=='0'){
      this.params={
        customerId: customerid,
        customerStatus:'0',
      };
      this.method();

    }else if(this.navParams.get('type')=='1'){
      this.params={
        customerId: customerid,
        customerStatus: '2'
      };
      this.method();
    }else if(this.navParams.get('type')=='2'){
      this.params={
        customerId: customerid,
        customerStatus:'4'
      };
      this.method();
    }

  }
  method(){
    this.customerProvider.mLook(1,{customer:this.params,followStatus: this.index+1,type: 1}).then(res => {
      if(res.data.hasOwnProperty('result')){
        this.lRecord=res.data.result;
      }else {
        this.lRecord=[];
      }

    });
  }
//状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PubliclookPage');
    // this.navBar.backButtonClick =this.navBar.backButtonClick ;
    // this.navBar.backButtonClick = () => {
    //   this.openWin(PublicpdetailPage,{customerId:this.customerid});
    // };
    this.navBar.backButtonClick = this.backButtonClick;
  }
  //添加active
  goToSlide(index) {
    this.slides.slideTo(index, 500);
    this.addActive(index);
    this.getRecords(this.customerid)
  }
  // 滑动切换
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();

    this.addActive(currentIndex);

  }
  // 改变tab 颜色
  addActive(index) {
    this.index = index;
  }
  data:any;
  confirm(item) {
    let alert = this.alertCtrl.create({
      title: '提示',
      message: '确定完成吗？',
      buttons: [
        {
          text: '完成',
          role: '完成',
          handler: () => {
            // console.log('Cancel clicked');
            //完成约看——状态
            this.customerProvider.mfinish(item.followupId,2,'',this.customerid).then(res => {
              console.log(res);
              if(res.success){
                this.toast.msg('完成成功');
                setTimeout(()=>{
                  this.openWin(PublicpdetailPage,{customerId:this.customerid})
                },200);
              }else {
                this.toast.error('完成失败')
              }
            });
          }
        },
        {
          text: '取消',
          handler: () => {
            // console.log('Buy clicked');

          }
        }
      ]
    });
    alert.present();
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

  close(item){
    this.openWin(PubliclosePage,{
      item:item,
      customerId:this.customerid
    })
  }
  addHouse(){
    this.openWin(AddpassengerPage)
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
