import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data=navParams.get('data');
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BelongerPage');
  }

}
