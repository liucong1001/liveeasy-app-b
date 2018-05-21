import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MdetailsPage } from '../mdetails/mdetails';

/**
 * Generated class for the MsgdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-msgdetail',
  templateUrl: 'msgdetail.html',
})
export class MsgdetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MsgdetailPage');
  }
  goMdetails(){
    this.navCtrl.push(MdetailsPage)
  }

}
