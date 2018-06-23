import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DeclinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-declinfo',
  templateUrl: 'declinfo.html',
})
export class DeclinfoPage {
  feelist:any;
  order:any;
  customer:any;
  nums:any;
  orderics:any;
  propertyinfo:any;
  orders:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nums=navParams.get('val');
    console.log(this.nums)
    this.order=navParams.get('order');
    this.orders=navParams.get('order').order;
    this.feelist=navParams.get('order').feeList;
    this.customer=navParams.get('order').order.customer;
    this.propertyinfo=navParams.get('order').order.propertyInfo;
    // JSON.parse(this.orderics=navParams.get('order').order.orderPics);
    // console.log(JSON.parse(this.orderics));
    console.log(this.customer)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeclinfoPage');
  }
//报单客户
  censusJSON=[
    {name:'本地',val:1},
    {name:'外地',val:2},
    {name:'港澳台',val:3},
    {name:'外籍',val:3},
  ]
  censuspipe(val){
    for(var i in this.censusJSON){
      if(val == this.censusJSON[i].val){
        return this.censusJSON[i].name;
      }
    }
  }

//收款信息——费用类型
  typeJSON=[
    {name:'居间服务费',val:1},
    {name:'按揭服务费',val:2},
    {name:'代办服务费',val:2},
  ]
  statpipe(val){
    for(var i in this.typeJSON){
      if(val == this.typeJSON[i].val){
        return this.typeJSON[i].name;
      }
    }
  }

  //收款信息——付款方
  payJSON=[
    {name:'业主',val:1},
    {name:'客户',val:2},
  ]
  paypipe(val){
    for(var i in this.payJSON){
      if(val == this.payJSON[i].val){
        return this.payJSON[i].name;
      }
    }
  }
}
