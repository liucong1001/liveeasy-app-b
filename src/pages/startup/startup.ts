import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HomePage } from '../home/home';
import {TabsPage} from "../tabs/tabs";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {LoginPage} from "../login/login";
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public localStorageProvider:LocalStorageProvider,) {

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
    window.clearInterval(this.timer);
    // 存储系统中存在登录ticket记录直接跳转到主界面
    if(this.localStorageProvider.get('ticket')){
      this.navCtrl.push(TabsPage);
    }else {
      this.navCtrl.setRoot(LoginPage);
    }
  }


}
