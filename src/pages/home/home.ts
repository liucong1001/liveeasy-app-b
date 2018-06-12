import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MsgdetailPage } from './msgdetail/msgdetail';
import {HomeProvider} from "../../providers/home/home";
import {AddhousePage} from "../addhouse/addhouse";
import {AddpassengerPage} from "../passenger/addpassenger/addpassenger";
import {DeclarationPage} from "./declaration/declaration";
import {AllsearchPage} from "../allsearch/allsearch";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  associate=false;
  pop=false;
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

  godeclara(){
  this.navCtrl.push(DeclarationPage)
}
  floorName = '';
  allSearch(){
    this.navCtrl.push(AllsearchPage,{floorName:this.floorName,index:1})
}

}
