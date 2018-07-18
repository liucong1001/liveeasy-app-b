import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import { AddpassengerPage } from './mypassenger/addpassenger/addpassenger';
import { MypassengerPage } from './mypassenger/mypassenger';
import { PublicpassengerPage } from './publicpassenger/publicpassenger';
import {StatusBar} from "@ionic-native/status-bar";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

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
  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams, public statusBar: StatusBar,
              public localStorageProvider: LocalStorageProvider,) {
    this.localStorageProvider.del('searchMoreData');
  }
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerPage');
  }
  addpassenger(){
    this.openWin(AddpassengerPage)
  }
  passenger(){
    this.openWin(MypassengerPage,null)
  }

  publicpassenger(){
    this.openWin(PublicpassengerPage,null)
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
