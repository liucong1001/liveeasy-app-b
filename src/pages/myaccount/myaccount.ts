import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UpdatepwdPage } from '../updatepwd/updatepwd';
import { VerifyphonePage } from '../verifyphone/verifyphone';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
