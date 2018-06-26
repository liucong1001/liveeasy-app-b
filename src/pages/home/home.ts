import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MsgdetailPage } from './msgdetail/msgdetail';
import {HomeProvider} from "../../providers/home/home";
import {AddhousePage} from "../housing/addhouse/addhouse";
import {AddpassengerPage} from "../passenger/mypassenger/addpassenger/addpassenger";
import {DeclarationPage} from "./declaration/declaration";
import {AllsearchPage} from "../allsearch/allsearch";
import {StatusBar} from "@ionic-native/status-bar";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  associate=false;
  pop=false;
  notificationNews = [];
  constructor(public navCtrl: NavController,public homeProvider:HomeProvider,public statusBar: StatusBar,
             ) {

  }
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  ionViewDidLoad(){
    this.homeProvider.getNotification().then(res=>{
      if(res){this.notificationNews = res.data.result;}
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
