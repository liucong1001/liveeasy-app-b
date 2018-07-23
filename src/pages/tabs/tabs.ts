import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { CenterPage } from '../center/center';
import { PassengerPage } from '../passenger/passenger';
import { HousingPage } from '../housing/housing';
import {Tabs,Platform} from 'ionic-angular';
import {Injectable,ViewChild} from '@angular/core';
import {BackButtonProvider} from "../../providers/common/backButton";
import {PermissionProvider} from "../../providers/permission/permission";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabs: Tabs;
  tab1Root = HomePage;
  tab2Root = HousingPage;
  tab3Root = PassengerPage;
  tab4Root = CenterPage;
  pages: Array<{tabTitle: string, icon: string, component: any}>;
  constructor(public backButtonProvider: BackButtonProvider,private platform: Platform,
              public permission:PermissionProvider) {
    this.pages = [
      {tabTitle:'首页',icon:'shouye',component:HomePage},
      {tabTitle:'房源',icon:'fangyuan',component:HousingPage},
      {tabTitle:'客源',icon:'keyuan',component:PassengerPage},
      {tabTitle:'我的',icon:'wode',component:CenterPage},
    ];
    //房源权限
    // if(!this.permission.has('erp:property:input:index')){
    //    this.pages.splice(1,1);
    // }
  }

  ionViewDidLoad() {

   }


}
