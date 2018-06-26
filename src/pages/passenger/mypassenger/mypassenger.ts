import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpassengerPage } from './addpassenger/addpassenger';
import { PassengerdetailPage } from './passengerdetail/passengerdetail';
import { PassengerlookPage } from './passengerlook/passengerlook';
import { PassengerfollowPage } from './passengerfollow/passengerfollow';
import { CloseprivateguestPage } from './closeprivateguest/closeprivateguest';
import {CustomerProvider} from "../../../providers/customer/customer";
import {PropertyProvider} from "../../../providers/property/property";

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
  area=[];
  estateList = []; //楼盘列表
  district = [];
  tradingArea = [];//商圈数组
  intentionTradeCodeId:string;  //用于转换商圈
  hasData = true;

  shangQuan = []; //商圈
  /**
   * 列表搜索条件
   * @type {{}}
   */
  values:any;
  params:CustomerPageParams = {
    customerSrc:'0',
    intentionDiviCode:'0',//区县
    intentionRoom:'0', //居室
    intentionTradeCode:'0',//商圈
    priceUnit:'1',
    sort:'1',
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,private customerProvider:CustomerProvider,
              public propertyProvider: PropertyProvider) {
    this.customerProvider.area().then(res=>{
      this.area = res.data.distrs;
      if(this.area){
        this.area.unshift({name:'不限',id:'99'});
      }

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
  searchDict = '';
  //搜索房源——区域——商圈
  go(item) {
    if(item.id == '99'){
      this.params.intentionDiviCode ='0';
      this.params.intentionTradeCode = '0';
      this.search();
    }


    console.log('查询商圈',item);
    this.searchDict = item.name;
    this.selected = item;//激活css选中状态
     //用code值匹配相应商圈
    this.district = [];
    for(var i in this.tradingArea){
       if(this.tradingArea[i].code.substring(0,6) == item.code){
          this.district.push(this.tradingArea[i]);
       }
    }
    if(this.district.length>1){
      this.district.unshift({name:'不限',code:'0'});
    }
    this.params.intentionDiviCode = item.code;

  }


  /**
   * 列表搜索
   */
  search(){
    this.pageData = null;
    this.hasData  = true;
    console.log('搜索',this.params);
    this.customerProvider.pageSearch(1,this.params).then(res=>{
      this.pageData = res.data.result;
      this.totalPages = res.data.totalPages;

      if(res.data.hasOwnProperty('result')){
        this.hasData  = true;
      }else{
        this.hasData = false;
      }

      //关闭搜索框子
      this.show = false;
      this.houseType = false;
      this.more = false;
      this.pop = false;
      // this.housingEstate = false;
      //户型搜索条件字显示
      if(this.searchFloorNum ==1){
        this.searchFloorNum = 2;
      }

    });
  }

  sxClick(){
    this.pageData = null;
    this.hasData  = true;
    console.log('搜索',this.params);
    this.customerProvider.pageSearch(1,this.params).then(res=>{
      this.pageData = res.data.result;
      this.totalPages = res.data.totalPages;

      if(res.data.hasOwnProperty('result')){
        this.hasData  = true;
      }else{
        this.hasData = false;
      }
      //关闭搜索框子
      this.show = false;
      this.houseType = false;
      this.more = false;
      this.pop = false;
      // this.housingEstate = false;
      //户型搜索条件字显示
      if(this.sx ==1){
        this.sx = 2;
      }
    });
  }
  // checks:boolean;
  sausage=[];
  updateCucumber(val,index) {
    console.log('值' +val+this.sausage[index]);
    this.values=val;
    if(val == 1){
      this.params.todayNoFollow='1';
    }else if(val == 2){
      this.params.threeDayNoFollow='2';
    }else if(val == 3){
      this.params.todayNoLook='3';
    }else if(val == 4){
      this.params.threeDayNoLook='4';
    }
  }
  sx=0;
  //重置
  reset(){
    console.log('清除',this.sausage);
    for(var i in this.sausage){
      this.sausage[i]=false;
    }
  }

  houseJSON = [
    {name:'不限',val:0},
    {name:'一室',val:1},
    {name:'二室',val:2},
    {name:'三室',val:3},
    {name:'四室',val:4},
    {name:'五室',val:5},
    {name:'五室以上',val:6},
  ];

  filtrateJson = [
    {name:'今日未跟进',val:1},
    {name:'超过三日未跟进',val:2},
    {name:'今日有约看',val:3},
    {name:'三日内有约看',val:4},

  ]

  //户型转换
  housePipe(data){
    for(var i in this.houseJSON){
      if(data == this.houseJSON[i].val){
        return this.houseJSON[i].name;
      }
    }
  }

  //筛选
  filtrate(data){
    for(var i in this.filtrateJson){
      if(data == this.filtrateJson[i].val){
        return this.filtrateJson[i].name;
      }
    }
  }


  //条数
  currentPage:number =1;
  all = false;
  //下拉加载
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
      this.currentPage++;
      if(this.currentPage >=this.totalPages){
        //如果都加载完成的情况，就直接 disable ，移除下拉加载
        infiniteScroll.enable(false);
        //toast提示
        this.all = true;
      }else {
        this.all = false;
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
  searchFloorNum = 0; //初始化搜索次数
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
    // this.searchFloorNum =1;
    if(this.searchFloorNum == 2){
      this.searchFloorNum =2;
    }else {
      this.searchFloorNum =1;
    }
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
    if(this.sx == 2){
      this.sx=2
    }else {
      this.sx =1;
    }
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
  gopassengerDetail(item){
    this.navCtrl.push(PassengerdetailPage,{customerId:item.customerId});
  }
  goFollow(item){
    this.navCtrl.push(PassengerfollowPage,{
      item:item,
    })
  }
  golook(item){
    this.navCtrl.push(PassengerlookPage,{
      item:item,
    })
  }
  closePrivateGuest(item){
    this.navCtrl.push(CloseprivateguestPage,{
      item:item,
    })
  };



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
    threeDayNoFollow?:string;
    threeDayNoLook?:string;
    todayNoFollow?:string;
    todayNoLook?:string;
 }
