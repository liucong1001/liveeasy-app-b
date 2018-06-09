import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { CenterPage } from '../center/center';
import { PassengerPage } from '../passenger/passenger';
import { HousingPage } from '../housing/housing';
import {Tabs} from 'ionic-angular';
import {Injectable,ViewChild} from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root = HomePage;
  tab2Root = HousingPage;
  // tab3Root = PassengerPage;
  // tab4Root = CenterPage;

  constructor() {
  }

  ionViewDidLoad() {

  }

}
