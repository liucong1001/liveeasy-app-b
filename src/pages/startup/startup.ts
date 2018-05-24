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
    console.log('init',this.num);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartupPage');
    // this.go();
    // this.timer=
  }
  // ngOnInit(){
  //
  // }

//   setInterval(() => {
//   this.num = this.num - 1;
//   if (this.num <= 0){
//   clearInterval(this.timer);
//   this.navCtrl.push(AccountPage)
// }
// console.log(this.num)
// }, 1000);
//     go(){
//         setInterval(function () {
//           this.num = 20;
//           this.num = this.num - 1;
//           console.log('num999',this.num);
//
//         },1000)
//      }
  gohome() {
    this.navCtrl.setRoot(AccountPage);
  }


}
