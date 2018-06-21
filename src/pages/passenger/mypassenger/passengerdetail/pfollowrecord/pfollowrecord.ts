import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpassengerPage } from '../../../mypassenger/addpassenger/addpassenger';
import {ToastComponent} from "../../../../../components/toast/toast";
import {CustomerProvider} from "../../../../../providers/customer/customer";
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
  params:any;
  customerid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerProvider:CustomerProvider,
              public toast:ToastComponent,) {
    this.customerid=navParams.get('id').customerId;
    console.log(this.customerid)
    this.params = {customerId:this.customerid}
    this.customerProvider.mfollow(1,{customer:this.params}).then(res => {
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
