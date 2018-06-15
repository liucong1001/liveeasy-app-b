import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PublicpassengerPage } from '../publicpassenger';
import {PublicCustomerProvider} from "../../../../providers/public-customer/public-customer";
import {PropertyProvider} from "../../../../providers/property/property";
import {CustomerProvider} from "../../../../providers/customer/customer";
import {HousedetailPage} from "../../../housing/housedetail/housedetail";
import {PublicpdetailPage} from "../publicpdetail/publicpdetail";

/**
   公客列表
 */

@IonicPage()
@Component({
  selector: 'page-choosehouse',
  templateUrl: 'choosehouse.html',
})
export class ChoosehousePage {
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
  params:PublicCustomerPageParams = {
    customerSrc:'0',
    orderBy:'DESC',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,public publicCustomerProvider:PublicCustomerProvider,
              public propertyProvider: PropertyProvider,private customerProvider:CustomerProvider,) {
    this.customerProvider.area().then(res=>{
      this.area = res;
    });
    this.customerProvider.tradingArea().then(res=>{
      this.tradingArea = res;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosehousePage');
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
        // this.params.intentionTradeCode = this.tradingArea[i].code;
      }
    }

  }
  /**
   * 列表搜索
   */
  search(){
    this.pageData = null;
    console.log('搜索',this.params);
    this.publicCustomerProvider.pageSearch(1,this.params).then(res=>{
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

  //条数
  currentPage: number = 1;
  all = false;
  //下拉加载
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
      this.currentPage++;
      console.log('加载完成后，关闭刷新', this.currentPage);

      if (this.currentPage >= this.totalPages) {
        //如果都加载完成的情况，就直接 disable ，移除下拉加载
        infiniteScroll.enable(false);
        //toast提示
        this.all = true;
      }else {
        this.all = false;
        this.propertyProvider.pageSearch(this.currentPage,this.params).then(res => {
          for (let i = 0; i < res.data.result.length; i++) {
            this.pageData.push(res.data.result[i]);
          }
          // console.log('下加载分数据2',res.data.result,'分页内容',this.pageData);
        });
      }

      console.log('Async operation has ended');
      infiniteScroll.complete(function () {
        console.log('数据请求完成');
      });
    }, 1000);

  }

  //进入详情页
  gopassengerDetail(item){
    this.navCtrl.push(PublicpdetailPage, {
      customerId:item.customerId,
    });
  }


  //menu
  showMenu1(){
    if(this.show==false || this.houseType == true || this.more == true){
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
    if(this.more == false || this.show == true || this.houseType==true){
      this.show=false;
      this.pop=true;
      this.more = true;
      this.houseType = false;
    }else{
      this.more=false;
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
  gopublicpasger(){
    this.navCtrl.push(PublicpassengerPage)
  }
}



/**
 * 公客搜索条件类
 */
class  PublicCustomerPageParams {
  customerSrc?:string;
  orderBy?:string;
}
