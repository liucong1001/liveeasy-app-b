import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
// import { LoginPage } from '../login/login';
declare var $: any;
/**
 * Generated class for the StartupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-startup',
  templateUrl: 'startup.html',
})
export class StartupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartupPage');
    var wait = $(".skip").html();
    timeOut();
    function timeOut() {
      if (wait != 0) {
        setTimeout(function () {
          $('.skip').text(--wait);
          timeOut();
          if(wait == 0){
            // this.NavController.pop(AccountPage);
          }
        }, 1000);
      }
    }

  }

  gohome() {
    this.navCtrl.setRoot(AccountPage);
  }


}
