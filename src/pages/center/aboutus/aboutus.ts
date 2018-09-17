import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams, Platform} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions';
import {AppVersion} from "@ionic-native/app-version";
import { ENV } from '@app/env'
import {NativeProvider} from "../../../providers/native/native";
/**
 * Generated class for the AboutusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
  @ViewChild(Navbar) navBar: Navbar;
  versionNumber :string;
  ENV:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions,  private appVersion: AppVersion,
              public platform: Platform,public  nativeProvider:NativeProvider,
              ) {
    this.ENV=ENV;
  }


  ionViewDidLoad() {
    this.navBar.backButtonClick = this.nativeProvider.back(this.navCtrl);
    this.platform.is('cordova')&&this.appVersion.getVersionCode().then(res=>{
      // console.log('获取版本',res);
    });
    this.platform.is('cordova')&&this.appVersion.getVersionNumber().then(res=>{
        this.versionNumber =res;
      // console.log('getVersionNumber',res);
    })
  }


}
