import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import { Events } from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
/**
 * Generated class for the DescPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-desc',
  templateUrl: 'desc.html',
})
export class DescPage {
  @ViewChild(Navbar) navBar: Navbar;
  content:any;
  constructor(public navCtrl: NavController, public nativePageTransitions: NativePageTransitions, public navParams: NavParams,public events: Events) {
    this.content = navParams.get('content');
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    console.log('ionViewDidLoad DescPage');
  }

  confirm(){
    console.log('描述内容',this.content);
    this.navCtrl.pop().then(() => {
      this.events.publish('content',this.content);
    });
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
