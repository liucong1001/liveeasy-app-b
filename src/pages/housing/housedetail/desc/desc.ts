import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
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

  content:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {
    this.content = navParams.get('content');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescPage');
  }

  confirm(){
    console.log('描述内容',this.content);
    this.navCtrl.pop().then(() => {
      this.events.publish('content',this.content);
    });
  }

}
