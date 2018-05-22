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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   let news = navParams.get('news');
   console.log('路由参数',news);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MdetailsPage');
  }

}
