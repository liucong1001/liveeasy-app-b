import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { CenterPage } from '../center/center';
import { PassengerPage } from '../passenger/passenger';
import { HousingPage } from '../housing/housing';
import {Tabs,Platform} from 'ionic-angular';
import {Injectable,ViewChild} from '@angular/core';
import {BackButtonProvider} from "../../providers/common/backButton";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabs: Tabs;
  tab1Root = HomePage;
  tab2Root = HousingPage;
  tab3Root = PassengerPage;
  tab4Root = CenterPage;

  constructor(public backButtonProvider: BackButtonProvider,private platform: Platform) {
    // this.platform.ready().then(() => {
    //   this.backButtonProvider.registerBackButtonAction(this.tabRef);
    // });
  }

  ionViewDidLoad() {

  }

}
