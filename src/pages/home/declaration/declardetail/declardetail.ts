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
  feelist:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private homeProvider:HomeProvider,) {
    this.orderid=navParams.get('item').orderId;
    console.log(this.orderid);
    this.homeProvider.decldetail(this.orderid).then(res=>{
      this.allOrder=res.data;
      this.orderDetail=res.data.order;
      this.feelist=res.data.feeList;
      this.users=res.data.user;
      console.log(this.allOrder);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeclardetailPage');
  }
  numJOSN=[
    {name:'报单客户',val:0},
    {name:'报单房源',val:1},
    {name:'业主信息',val:2},
    {name:'合同信息',val:3},
    {name:'收款信息',val:4},
    {name:'业绩类型',val:5},
    {name:'补充协议',val:6},
  ];
goInfo(val){
    this.navCtrl.push(DeclinfoPage,{
      val:val,
      order:this.allOrder,
    })
}

  paypipe(val){
    for(var i in this.numJOSN){
      if(val == this.numJOSN[i].val){
        return this.numJOSN[i].name;
      }
    }
  }


}
