import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {HousingPage} from "../../housing";
import {NativeProvider} from "../../../../providers/native/native";

/**
 * Generated class for the DescribePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-describe',
  templateUrl: 'describe.html',
})
export class DescribePage {
  propertydesc:any;
  @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController, public statusBar: StatusBar,public navParams: NavParams,public nativePageTransitions: NativePageTransitions,public  nativeProvider:NativeProvider) {
    this.propertydesc=navParams.get('item').propertyDesc;

  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.nativeProvider.back(this.navCtrl);
  }
//状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  descForAPP(data){
    return   data.replace(/\n/ig, '<br/>');
  }

}
