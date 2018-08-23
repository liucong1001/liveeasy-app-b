import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {StatusBar} from "@ionic-native/status-bar";
/**
 * Generated class for the DescsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicdesc',
  templateUrl: 'publicdesc.html',
})
export class PublicdescPage {
  val:any;
  content:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public events: Events,public statusBar: StatusBar,) {
    this.val=navParams.get('val');
    this.content = navParams.get('content');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescsPage');
  }

//状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
}
