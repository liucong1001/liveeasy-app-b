import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutusPage } from '../aboutus/aboutus';
import { HelpPage } from '../help/help';
import { UpdatepwdPage } from '../updatepwd/updatepwd';
import { MyaccountPage } from '../myaccount/myaccount';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.photo = this.localStorageProvider.get('photo');
    this.photo = 'https://gd2.alicdn.com/imgextra/i1/0/TB11jq4neuSBuNjSsziXXbq8pXa_!!0-item_pic.jpg';
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
}
