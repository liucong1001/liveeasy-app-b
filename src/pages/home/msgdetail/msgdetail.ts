import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import { MdetailsPage } from './mdetails/mdetails';
import {HomeProvider} from "../../../providers/home/home";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";

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
              public nativePageTransitions: NativePageTransitions,public navParams: NavParams,public statusBar: StatusBar,
              public homeProvider:HomeProvider) {

      this.homeProvider.getNotification().then(res=>{
          this.notificationNews = res.data.result;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MsgdetailPage');
    // this.navBar.backButtonClick = this.backButtonClick;
  }
  goMdetails(item){
    this.openWin(MdetailsPage,{news:item})
  }
  //------返回处理--------//
  backButtonClick = (e: UIEvent) => {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: 3,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options)
      .then()
      .catch();
    this.navCtrl.pop({animate:false});
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

  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

}
