import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mdetails',
  templateUrl: 'mdetails.html',
})
export class MdetailsPage {

  news:object;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.news = navParams.get('news');
  }

}
