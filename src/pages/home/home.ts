import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MsgdetailPage } from '../msgdetail/msgdetail';
import {HomeProvider} from "../../providers/home/home";
import {AddhousePage} from "../addhouse/addhouse";
import {AddpassengerPage} from "../addpassenger/addpassenger";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notificationNews = [];
  constructor(public navCtrl: NavController,public homeProvider:HomeProvider) {
    // // 测试接口
    // this.homeProvider.test().then(res=>{
    //   console.log('test成功',res);
    // }).catch(err=>{
    //   console.log('test失败',err);
    // });
    // // pagelist接口
    // this.homeProvider.pageList().then();
    //   this.homeProvider.cpageList({a:'ad',name:'liu'}).then();
    //   this.homeProvider.gpageList({a:'11',b:'22'}).then();

       this.homeProvider.getNotification().then(res=>{
           this.notificationNews = res.data.result;
       });
  }
  addhouse(){
    this.navCtrl.push(AddhousePage)
  }
  addpassenger(){
    this.navCtrl.push(AddpassengerPage)
  }
  msgDetail(){
    this.navCtrl.push(MsgdetailPage)
  }

}
