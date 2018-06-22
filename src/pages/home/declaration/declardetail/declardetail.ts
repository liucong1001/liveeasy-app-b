import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DeclinfoPage} from "./declinfo/declinfo";
import {HomeProvider} from "../../../../providers/home/home";
/**
 * Generated class for the DeclardetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-declardetail',
  templateUrl: 'declardetail.html',
})
export class DeclardetailPage {
  orderid:any;
  users:any;
  orderDetail:any;
  allOrder:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private homeProvider:HomeProvider,) {
    this.orderid=navParams.get('item').orderId;
    console.log(this.orderid);
    this.homeProvider.decldetail(this.orderid).then(res=>{
      this.allOrder=res.data;
      this.orderDetail=res.data.order;
      this.users=res.data.user;
      console.log(this.allOrder);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeclardetailPage');
  }
goInfo(){
    this.navCtrl.push(DeclinfoPage)
}

}
