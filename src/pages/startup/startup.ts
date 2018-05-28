import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
// import { LoginPage } from '../login/login';
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
  public num = 5;
  public timer:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    window.clearInterval(this.timer);
    this.timer=setInterval(()=>{
      this.num--;

      if(this.num===0){
        window.clearInterval(this.timer);
        this.gohome();
      }
    },1000);
  }

  gohome() {
    this.navCtrl.setRoot(AccountPage);
  }


}
