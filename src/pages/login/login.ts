import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountPage } from '../account/account';
import {TabsPage} from "../tabs/tabs";
declare var $: any;
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goAccount() {
    this.navCtrl.setRoot(AccountPage);
  }
  goHome(){
    this.navCtrl.setRoot(TabsPage);
  }
  sendMsg() {
    var validCode = true;
    // $(".sendMsg").click(function () {
      var time = 90;
      var code = $(".sendMsg");
      if (validCode) {
        validCode = false;
        code.addClass("msgs1");
        var t = setInterval(function () {
          time--;
          code.html(time + "秒后再次发送");
          if (time == 0) {
            clearInterval(t);
            code.html("重新获取(90s)");
            validCode = true;
            code.removeClass("msgs1");

          }
        }, 1000)
      }
    // })

  }
 

}
