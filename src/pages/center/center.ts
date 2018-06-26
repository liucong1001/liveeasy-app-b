import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { AboutusPage } from './aboutus/aboutus';
import { HelpPage } from './help/help';
import { UpdatepwdPage } from './updatepwd/updatepwd';
import { MyaccountPage } from './myaccount/myaccount';
import {AccountPage} from "../account/account";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";

/**
 * Generated class for the CenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-center',
  templateUrl: 'center.html',
})
export class CenterPage {
  photo:any;
  name:any;
  gh:any;
  custposName:any;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams,public localStorageProvider:LocalStorageProvider,
    public nativePageTransitions: NativePageTransitions,
              public statusBar: StatusBar
  ) {

    // this.photo = this.localStorageProvider.get('loginInfo').photo;
    this.name = this.localStorageProvider.get('loginInfo').name;
    this.gh=this.localStorageProvider.get('loginInfo').no;
    this.custposName =this.localStorageProvider.get('loginInfo') .custPosName
    this.photo = 'https://gd2.alicdn.com/imgextra/i1/0/TB11jq4neuSBuNjSsziXXbq8pXa_!!0-item_pic.jpg';
    console.log(this.name);
    this.navCtrl.swipeBackEnabled = false; //ios禁用右滑返回
  }
  ionViewWillEnter() {
    this.statusBar.styleDefault();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CenterPage');
  }
  goaccount(){
    this.openWin(MyaccountPage);
  }
  aboutUs() {
    this.openWin(AboutusPage)
  }
  help() {
    this.openWin(HelpPage)
  }
  updatepwd() {
    this.openWin(UpdatepwdPage)
  }
  reset(){

    localStorage.clear();
    this.content.resize();
    this.navCtrl.push(AccountPage);
  }

  openWin(goPage) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage);
  }
}
