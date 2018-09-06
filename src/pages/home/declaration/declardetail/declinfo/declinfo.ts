import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {LocalStorageProvider} from "../../../../../providers/local-storage/local-storage";
import {ArryCodeValuePipe} from "../../../../../pipes/arry-code-value/arry-code-value";

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
  localCode:any;
  uers:any;
  roleOrder=[];
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,public localStorageProvider: LocalStorageProvider,
              public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams) {
    this.nums=navParams.get('val');
    this.localCode = this.localStorageProvider.get('codeData');
    this.order=navParams.get('order');
    this.orders=navParams.get('order').order;
    this.feelist=navParams.get('order').feeList;
    this.asslist=navParams.get('order').assList;
    this.customer=navParams.get('order').order.customer;
    this.uers=navParams.get('order').user;
    this.propertyinfo=navParams.get('order').order.propertyInfo;
    this.ownerinfo=JSON.parse(navParams.get('order').order.ownerInfo);
    this.localCode = this.localStorageProvider.get('codeData');
    this.roleOrder = new ArryCodeValuePipe().transform(this.localCode,'role_in_order');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DeclinfoPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
  //业绩类型——分成角色
  rolePipe(val){
    for(var i in this.roleOrder){
      if(val == this.roleOrder[i].val){
        return this.roleOrder[i].name;
      }
    }
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
    {name:'代办服务费',val:3},
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
  orJSON:Array<{name:string;val:string}>;
  orpipe(val){
    this.orJSON = new ArryCodeValuePipe().transform(this.localCode,'orientation');
    for(var i in this.orJSON){
      if(val ==  this.orJSON[i].val){
        return  this.orJSON[i].name;
      }
    }
  }
//报单房源——抵押情况
  pmJSON:Array<{name:string;val:string}>;
  pmpipe(val){
    this.pmJSON = new ArryCodeValuePipe().transform(this.localCode,'property_mortgage');
    for(var i in this.pmJSON){
      if(val == this.pmJSON[i].val){
        return this.pmJSON[i].name;
      }
    }
  }
  //报单房源——产权性质
  buzzJSON:Array<{name:string;val:string}>;
  buzzpipe(val){
    this.buzzJSON =  new ArryCodeValuePipe().transform(this.localCode,'buzz_owner_type');
    for(var i in this.buzzJSON){
      if(val == this.buzzJSON[i].val){
        return this.buzzJSON[i].name;
      }
    }
  }

  //合同信息——贷款类型
  loansJSON:Array<{name:string;val:string}>;
  loanspipe(val){
    this.loansJSON =  new ArryCodeValuePipe().transform(this.localCode,'loan_type');
    for(var i in this.loansJSON){
      if(val == this.loansJSON[i].val){
        return this.loansJSON[i].name;
      }
    }
  }
  //合同信息——资金交接方式
  deliverJSON:Array<{name:string;val:string}>;
  deliverpipe(val){
    this.deliverJSON =  new ArryCodeValuePipe().transform(this.localCode,'mny_deliver_type');
    for(var i in this.deliverJSON){
      if(val == this.deliverJSON[i].val){
        return this.deliverJSON[i].name;
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
