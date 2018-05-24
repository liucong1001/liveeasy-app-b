import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UpdatepwdPage } from '../updatepwd/updatepwd';
import { VerifyphonePage } from '../verifyphone/verifyphone';
import {HttpClient} from '@angular/common/http';
import {LocalStorageProvider} from  '../../providers/local-storage/local-storage'
/**
 * Generated class for the MyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {
  phone:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public localStorageProvider:LocalStorageProvider) {
    this.phone = this.localStorageProvider.get('phone');
    console.log(this.phone)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccountPage');
  }
  updatepwd() {
    this.navCtrl.push(UpdatepwdPage)
  }
  gophone(){
    this.navCtrl.push(VerifyphonePage)
  }

}
