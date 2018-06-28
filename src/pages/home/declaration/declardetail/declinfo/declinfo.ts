import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

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
  ownerinfo:any;
  propertyinfo:any;
  orders:any;
  asslist:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams) {
    this.nums=navParams.get('val');
    console.log(this.nums)
    this.order=navParams.get('order');
    this.orders=navParams.get('order').order;
    this.feelist=navParams.get('order').feeList;
    this.asslist=navParams.get('order').assList;
    this.customer=navParams.get('order').order.customer;
    this.propertyinfo=navParams.get('order').order.propertyInfo;
    this.ownerinfo=JSON.parse(navParams.get('order').order.ownerInfo);
    console.log(this.ownerinfo);
    console.log(this.customer)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeclinfoPage');
    this.navBar.backButtonClick = this.backButtonClick;
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

  //报单房源——朝向
  orJSON=[
    {name:'东',val:1},
    {name:'东南',val:2},
    {name:'南',val:3},
    {name:'西南',val:4},
    {name:'西',val:5},
    {name:'西北',val:6},
    {name:'北',val:7},
    {name:'东北',val:8},
  ]
  orpipe(val){
    for(var i in this.orJSON){
      if(val == this.orJSON[i].val){
        return this.orJSON[i].name;
      }
    }
  }
//报单房源——抵押情况
  pmJSON=[
    {name:'无',val:0},
    {name:'一押',val:1},
    {name:'二押',val:2},
  ]
  pmpipe(val){
    for(var i in this.pmJSON){
      if(val == this.pmJSON[i].val){
        return this.pmJSON[i].name;
      }
    }
  }
  //报单房源——产权性质
buzzJSON=[
  {name:'其他',val:0},
    {name:'商品房',val:1},
    {name:'公房',val:2},
    {name:'经适房',val:3},
  {name:'房改房',val:4},
  {name:'拆迁安置房',val:5},

  ]
  buzzpipe(val){
    for(var i in this.buzzJSON){
      if(val == this.buzzJSON[i].val){
        return this.buzzJSON[i].name;
      }
    }
  }

  //------返回处理--------//
  backButtonClick = (e: UIEvent) => {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: 3,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options)
      .then()
      .catch();
    this.navCtrl.pop({animate:false});
  }
}
