import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import { Events } from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {NativeProvider} from "../../../../providers/native/native";
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
  descApp:any;
  constructor(public navCtrl: NavController, public nativePageTransitions: NativePageTransitions, public navParams: NavParams,
              public events: Events,public  nativeProvider:NativeProvider) {
    this.content = navParams.get('content');
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.nativeProvider.back(this.navCtrl);
  }

  watchText(event){
    // console.log('event+++',event);
    // console.log(this.content);
    //  this.descApp = this.content;
    // if (event.keyCode == "13"){
    //   this.descApp+=' \\r\\n';
    // }
    //
    //
    //  console.log('',this.descApp);
  }


  confirm(){
    // console.log('描述内容',this.content);
    this.navCtrl.pop().then(() => {
      this.events.publish('content',this.content);
    });
  }

}
