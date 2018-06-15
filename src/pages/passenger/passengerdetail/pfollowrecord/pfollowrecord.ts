import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpassengerPage } from '../../addpassenger/addpassenger';
import {ToastComponent} from "../../../../components/toast/toast";
import {CustomerProvider} from "../../../../providers/customer/customer";
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
  fRecord:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerProvider:CustomerProvider,
              public toast:ToastComponent,) {
    this.customerProvider.mfollow({}).then(res => {
      console.log(res.data.result);
      this.fRecord=res.data.result
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PfollowrecordPage');
  }
  addHouse(){
    this.navCtrl.push(AddpassengerPage)
  }

}
