import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {HousingPage} from "../../housing";

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
  constructor(public navCtrl: NavController, public statusBar: StatusBar,public navParams: NavParams,public nativePageTransitions: NativePageTransitions,) {
    this.propertydesc=navParams.get('item').propertyDesc;
    // console.log(this.propertydesc)
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.pop()
    };
    // console.log('ionViewDidLoad DescribePage');
  }
//状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  descForAPP(data){
    return   data.replace(/\n/ig, '<br/>');
  }



  //------返回处理--------//
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
  };

  //------跳转页面过渡--------//
  openWin(goPage, param = {}) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage, param, {animate:false});
  }

}
