import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the BelongerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-belonger',
  templateUrl: 'belonger.html',
})
export class BelongerPage {
  data:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams) {
    this.data=navParams.get('data');
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BelongerPage');
    this.navBar.backButtonClick = this.backButtonClick;
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
  }


}
