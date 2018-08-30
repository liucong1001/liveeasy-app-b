import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions';
import {AppVersion} from "@ionic-native/app-version";
import { ENV } from '@app/env'
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
              ) {
    this.ENV=ENV;
  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad AboutusPage');
    // this.nativePageTransitions.cancelPendingTransition();
    this.navBar.backButtonClick = this.backButtonClick;
    this.appVersion.getVersionCode().then(res=>{
      // console.log('获取版本',res);
    });
    this.appVersion.getVersionNumber().then(res=>{
        this.versionNumber =res;
      // console.log('getVersionNumber',res);
    })
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
