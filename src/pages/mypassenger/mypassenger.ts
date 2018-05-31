import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpassengerPage } from '../addpassenger/addpassenger';
import { PassengerdetailPage } from '../passengerdetail/passengerdetail';
import { PassengerlookPage } from './../passengerlook/passengerlook';
import { PassengerfollowPage } from './../passengerfollow/passengerfollow';
import { CloseprivateguestPage } from '../closeprivateguest/closeprivateguest';
import {CustomerProvider} from "../../providers/customer/customer";
import {PropertyProvider} from "../../providers/property/property";
/**
 * Generated class for the MypassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mypassenger',
  templateUrl: 'mypassenger.html',
})
export class MypassengerPage {
  show=false;
  houseType=false;
  more=false;
  pop=false;
  pageData = [];
  totalPages:number;//总页数
  /**
   * 列表搜索条件
   */
  area: any;
  estateList = []; //楼盘列表
  district:any;
  tradingArea = [];//商圈数组
  intentionTradeCodeId:string;  //用于转换商圈
  /**
   * 列表搜索条件
   * @type {{}}
   */
  params:CustomerPageParams = {
     customerSrc:'0',
    intentionDiviCode:'0',//区县
    intentionRoom:'0', //居室
    intentionTradeCode:'0',//商圈
    priceUnit:'1',
    sort:'1',
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,private customerProvider:CustomerProvider,
              public propertyProvider: PropertyProvider,) {
    this.customerProvider.area().then(res=>{
      this.area = res;
    });
    this.customerProvider.tradingArea().then(res=>{
      this.tradingArea = res;
    })

  }

  ionViewDidLoad() {
    this.search();
  }

  selected :any;
  isActive(item) {
    return this.selected === item;
  };

  //搜索房源——区域——商圈
  go(item) {
    console.log('查询商圈',item);
    this.selected = item;
    this.propertyProvider.search2(item.id).then(res => {
      this.district=res.data;
      // if(this.district == undefined){
      //   // alert('暂无该地区!')
      //   this.hTips=true
      // }else {
      //   this.hTips=false;
      // }
    })
  }

  /**
   * 监听商圈id——code（转换）
   */
  intentionTrade(event){
     console.log('商圈',event);
     for(var i in this.tradingArea){
        if(this.tradingArea[i].id == event){
          this.params.intentionTradeCode = this.tradingArea[i].code;
        }
     }

  }
  /**
   * 列表搜索
   */
  search(){
    this.pageData = null;
    console.log('搜索',this.params);
    this.customerProvider.pageSearch(1,this.params).then(res=>{
      this.pageData = res.data.result;
      this.totalPages = res.data.totalPages;
      //关闭搜索框子
      this.show = false;
      this.houseType = false;
      this.more = false;
      this.pop = false;
      // this.housingEstate = false;
    });
  }
  //重置
  reset(){
   this.params = {
      customerSrc:'0',
      intentionDiviCode:'0',//区县
      intentionRoom:'0', //居室
      intentionTradeCode:'0',//商圈
      priceUnit:'1',
      sort:'1',
    };
    this.search();
  }


  //条数
  currentPage:number =1;
  //下拉加载
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
      this.currentPage++;
      if(this.currentPage >=this.totalPages){
        //如果都加载完成的情况，就直接 disable ，移除下拉加载
        infiniteScroll.enable(false);
        //toast提示
        alert("已加载所有");
      }else {
        console.log('加载完成后，关闭刷新',this.currentPage);
        this.customerProvider.pageSearch(this.currentPage,this.params).then(res=>{
          for(let i=0;i<res.data.result.length;i++){
            this.pageData.push(res.data.result[i]);
          }
        });

      }


      console.log('Async operation has ended');
      infiniteScroll.complete(function () {
        console.log('数据请求完成');
      });
    }, 1000);

  }

  //menu
  showMenu1(){
    if(this.show==false || this.houseType == true || this.more == true ){
      this.show=true;
      this.pop=true;
      this.houseType = false;
      this.more=false;
    }else{
      this.show=false;
      this.pop=false;
    }
  }
  showMenu2(){
    if(this.houseType==false || this.show == true || this.more == true ){
      this.houseType=true;
      this.show=false;
      this.pop=true;
      this.more = false;
    }else{
      this.houseType = false;
      this.pop=false;
    }
  }
  showMenu3(){
    if(this.more==false || this.show == true || this.houseType == true){
      this.more=true;
      this.show=false;
      this.pop=true;
      this.houseType = false;
    }else{
      this.more = false;
      this.pop=false;
    }
  }
  pops(){
    if(this.more==true || this.show == true || this.houseType == true){
      this.more=false;
      this.show=false;
      this.pop=false;
      this.houseType = false;
    }
  }
  addpassenger(){
    this.navCtrl.push(AddpassengerPage)
  }
  gopassengerDetail(){
    this.navCtrl.push(PassengerdetailPage);
  }
  goFollow(){
    this.navCtrl.push(PassengerfollowPage)
  }
  golook(){
    this.navCtrl.push(PassengerlookPage)
  }
  closePrivateGuest(){
    this.navCtrl.push(CloseprivateguestPage)
  }
}

/**
 * 定义搜索参数类
 */
 class CustomerPageParams {
    customerSrc:string;
    intentionDiviCode:string;
    intentionRoom:string;
    intentionTradeCode:string;
    priceUnit:string;
    sort:string;
 }
