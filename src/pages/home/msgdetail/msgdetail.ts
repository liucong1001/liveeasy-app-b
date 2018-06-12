import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MdetailsPage } from '../mdetails/mdetails';
import {HomeProvider} from "../../../providers/home/home";

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
    notificationNews = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public homeProvider:HomeProvider) {

      this.homeProvider.getNotification().then(res=>{
          this.notificationNews = res.data.result;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MsgdetailPage');
  }
  goMdetails(item){
    this.navCtrl.push(MdetailsPage,{news:item})
  }


}
