import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { AboutusPage } from '../aboutus/aboutus';
import { HelpPage } from '../help/help';
import { UpdatepwdPage } from '../updatepwd/updatepwd';
import { MyaccountPage } from '../myaccount/myaccount';
import {AccountPage} from "../account/account";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public localStorageProvider:LocalStorageProvider) {
    // this.photo = this.localStorageProvider.get('loginInfo').photo;
    this.name = this.localStorageProvider.get('loginInfo').name;
    this.gh=this.localStorageProvider.get('loginInfo').no;
    this.custposName =this.localStorageProvider.get('loginInfo') .custPosName
    this.photo = 'https://gd2.alicdn.com/imgextra/i1/0/TB11jq4neuSBuNjSsziXXbq8pXa_!!0-item_pic.jpg';
    console.log(this.name)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CenterPage');
  }
  goaccount(){
    this.navCtrl.push(MyaccountPage);
  }
  aboutUs() {
    this.navCtrl.push(AboutusPage)
  }
  help() {
    this.navCtrl.push(HelpPage)
  }
  updatepwd() {
    this.navCtrl.push(UpdatepwdPage)
  }
  reset(){
    localStorage.clear();
    this.content.resize();
    this.navCtrl.push(AccountPage);
  }
}
