import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpassengerPage } from '../addpassenger/addpassenger';
/**
 * Generated class for the PfollowrecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pfollowrecord',
  templateUrl: 'pfollowrecord.html',
})
export class PfollowrecordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PfollowrecordPage');
  }
  addHouse(){
    this.navCtrl.push(AddpassengerPage)
  }

}
