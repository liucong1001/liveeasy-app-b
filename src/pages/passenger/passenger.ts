import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpassengerPage } from './mypassenger/addpassenger/addpassenger';
import { MypassengerPage } from './mypassenger/mypassenger';
import {PsearchPage} from "./psearch/psearch";
import { PublicpassengerPage } from './publicpassenger/publicpassenger';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
/**
 * Generated class for the PassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passenger',
  templateUrl: 'passenger.html',
})
export class PassengerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public localStorageProvider: LocalStorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerPage');
  }
  addpassenger(){
    this.navCtrl.push(AddpassengerPage)
  }
  passenger(){
    this.navCtrl.push(MypassengerPage)
  }
  publicpassenger(){
    this.navCtrl.push(PublicpassengerPage)
  }

}
