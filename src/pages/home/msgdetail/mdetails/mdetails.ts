import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {NativeProvider} from "../../../../providers/native/native";
/**
 * Generated class for the MdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mdetails',
  templateUrl: 'mdetails.html',
})
export class MdetailsPage {
  @ViewChild(Navbar) navBar: Navbar;
  news:object;
  constructor(public navCtrl: NavController,public statusBar: StatusBar,
              public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams,public  nativeProvider:NativeProvider) {
   this.news = navParams.get('news');
  }
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.nativeProvider.back(this.navCtrl);
  }

  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
}
