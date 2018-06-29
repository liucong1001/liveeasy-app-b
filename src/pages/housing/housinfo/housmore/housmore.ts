import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PropertyModel} from "../../../../model/property/property.model";

/**
 * Generated class for the HousmorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-housmore',
  templateUrl: 'housmore.html',
})
export class HousmorePage {
  data:PropertyModel;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.data = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HousmorePage');
  }

}
