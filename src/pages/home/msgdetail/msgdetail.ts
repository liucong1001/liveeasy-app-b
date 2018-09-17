import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import { MdetailsPage } from './mdetails/mdetails';
import {HomeProvider} from "../../../providers/home/home";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {NativeProvider} from "../../../providers/native/native";

/**
 * Generated class for the MsgdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-msgdetail',
  templateUrl: 'msgdetail.html',
})
export class MsgdetailPage {
    notificationNews = [];
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,public navParams: NavParams,
              public statusBar: StatusBar,public  nativeProvider:NativeProvider,
              public homeProvider:HomeProvider) {

      this.homeProvider.getNotification().then(res=>{
          this.notificationNews = res.data.result;
      });
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.nativeProvider.back(this.navCtrl);
  }
  goMdetails(item){
    this.nativeProvider.openWin(this.navCtrl,MdetailsPage,{news:item})
  }

  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

}
