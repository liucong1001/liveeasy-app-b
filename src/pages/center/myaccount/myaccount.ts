import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import { UpdatepwdPage } from '../updatepwd/updatepwd';
import { VerifyphonePage } from '../verifyphone/verifyphone';
import {HttpClient} from '@angular/common/http';
import {LocalStorageProvider} from '../../../providers/local-storage/local-storage'
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
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
  @ViewChild(Navbar) navBar: Navbar;
  phone:any;
  photo:any;

  constructor(public navCtrl: NavController,public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams,public localStorageProvider:LocalStorageProvider) {
    this.phone = this.localStorageProvider.get('loginInfo').phone;
    // this.photo = this.localStorageProvider.get('loginInfo').photo;
    this.photo = 'https://gd2.alicdn.com/imgextra/i1/0/TB11jq4neuSBuNjSsziXXbq8pXa_!!0-item_pic.jpg';
    console.log(this.phone)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccountPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
  updatepwd() {
    this.navCtrl.push(UpdatepwdPage)
  }
  gophone(){
    this.navCtrl.push(VerifyphonePage)
  }
  backButtonClick = (e: UIEvent) => {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: 3,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options)
      .then()
      .catch();
    this.navCtrl.pop({animate:false});
  }

}
