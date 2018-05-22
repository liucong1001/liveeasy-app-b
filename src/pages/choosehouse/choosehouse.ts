import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PublicpassengerPage } from '../publicpassenger/publicpassenger';

/**
 * Generated class for the ChoosehousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choosehouse',
  templateUrl: 'choosehouse.html',
})
export class ChoosehousePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosehousePage');
  }
  gopublicpasger(){
    this.navCtrl.push(PublicpassengerPage)
  }
}
