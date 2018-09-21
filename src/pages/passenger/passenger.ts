import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import { AddpassengerPage } from './mypassenger/addpassenger/addpassenger';
import { MypassengerPage } from './mypassenger/mypassenger';
import { PublicpassengerPage } from './publicpassenger/publicpassenger';
import {StatusBar} from "@ionic-native/status-bar";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {NativeProvider} from "../../providers/native/native";
import {DealPage} from "./deal/deal";
import {InvalidPage} from "./invalid/invalid";
import {SoldPage} from "./sold/sold";

/**
 * Generated class for the PassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passenger',
  templateUrl: 'passenger.html',
})
export class PassengerPage {
  @ViewChild(Navbar) navBar: Navbar;
  constructor(
    public navCtrl: NavController,
    public nativePageTransitions: NativePageTransitions,
    public navParams: NavParams, public statusBar: StatusBar,
    public localStorageProvider: LocalStorageProvider,public  nativeProvider:NativeProvider,

    ) {
    this.localStorageProvider.del('searchMoreData');
  }
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerPage');
  }
  addpassenger(){
    this.nativeProvider.openWin(this.navCtrl,AddpassengerPage)
  }
  passenger(){
    this.nativeProvider.openWin(this.navCtrl,MypassengerPage,null)
  }
  publicpassenger(){
    this.nativeProvider.openWin(this.navCtrl,PublicpassengerPage,null)
  }
  //无效客户
  invalid(){
    this.nativeProvider.openWin(this.navCtrl,InvalidPage,null)
  }
  //他售客户
  sold(){
    this.nativeProvider.openWin(this.navCtrl,SoldPage,null)
  }
  //成交客户
  deal(){
    this.nativeProvider.openWin(this.navCtrl,DealPage,null)
  }


}
