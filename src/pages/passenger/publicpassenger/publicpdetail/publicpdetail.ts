import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import { AddpublicguestPage } from './addpublicguest/addpublicguest';
import {CustomerProvider} from "../../../../providers/customer/customer";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {ToastComponent} from "../../../../components/toast/toast";
import {StatusBar} from "@ionic-native/status-bar";
import {PubliclookPage} from "./publiclook/publiclook";
import {PublicfollowPage} from "./publicfollow/publicfollow";
import {PublicdescPage} from "./publicdesc/publicdesc";

/**
 * Generated class for the PublicpdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicpdetail',
  templateUrl: 'publicpdetail.html',
})
export class PublicpdetailPage {
  showIntention=false;
  right=true;
  down=false;
  customerId:any;
  data:object;
  datas:any;
  customeroGrageInfoList = [];//客户等级
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,
              public statusBar: StatusBar,
              public navParams: NavParams,public customerProvider:CustomerProvider,
              public toast:ToastComponent) {
    this.customerId=navParams.get('customerId');
    // console.log(navParams.data);

    this.customerProvider.getPublicDetail(this.customerId).then(res=>{
      if(res.success){
        this.data = res.data;
        this.datas=res.data.entity;
        console.log(this.data)
      }else {
        this.toast.defaultMsg('middle',res.msg)
      }

    });
    //
    this.customerProvider.customeroGrageInfo().then(res=>{
      this.customeroGrageInfoList = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicpdetailPage1');
    this.navBar.backButtonClick = this.backButtonClick;
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  clickIntention(){
    if(this.showIntention==false ){
      this.showIntention=true;
      this.right=false;
      this.down=true;
    }else{
      this.showIntention=false;
      this.right=true;
      this.down=false;
    }
  }
  addPublicGuest(){
    this.navCtrl.push(AddpublicguestPage)
  }
  passengerLook(){
    this.navCtrl.push(PubliclookPage,{
      id:this.datas,
      customerId:this.customerId
    })
  }
  passengerFollow(){
    this.navCtrl.push(PublicfollowPage,{
      id:this.datas,
      customerId:this.customerId
    })
  }
  //客户等级转换
  customerGrade(val){
    if(val){
      for(var i in this.customeroGrageInfoList){
           if(this.customeroGrageInfoList[i].value==val){
             return this.customeroGrageInfoList[i].label;
           }
      }
    }
  };

  decorationData = [
    {name:'毛坯',val:'1'},
    {name:'简装',val:'2'},
    {name:'中等装修',val:'4'},
    {name:'精装',val:'8'},
    {name:'豪装',val:'16'},
  ];
  decorationPipe (arry){
    var str= '';
    if(arry){
      for(var i in arry){
           for(var x in this.decorationData){
             if(arry[i]==this.decorationData[x].val){
               str+=this.decorationData[x].name+','
             }
           }
      }
      return str;
    }

  }

  rest=false;
  restRight=true;
  restDown=false;
  rests(){
    if(this.rest==false ){
      this.rest=true;
      this.restRight=false;
      this.restDown=true;
    }else{
      this.rest=false;
      this.restRight=true;
      this.restDown=false;
    }
  }

  desc(val,data){
    if(val==1){
      this.openWin(PublicdescPage,{
        val:1,
        content:data.entity.requiredDemands,
      });
    }
    if(val==2){
      this.openWin(PublicdescPage,{
        val:2,
        content:data.entity.againstDemands,
      });
    }
    if(val==3){
      this.openWin(PublicdescPage,{
        val:3,
        content:data.entity.comments
      });
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
