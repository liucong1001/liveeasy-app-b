import { Component ,ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Navbar, ItemSliding, Tabs, Events} from 'ionic-angular';
import { AddpassengerPage } from './addpassenger/addpassenger';
import { PassengerdetailPage } from './passengerdetail/passengerdetail';
import { PassengerlookPage } from './passengerlook/passengerlook';
import { PassengerfollowPage } from './passengerfollow/passengerfollow';
import { CloseprivateguestPage } from './closeprivateguest/closeprivateguest';
import {CustomerProvider} from "../../../providers/customer/customer";
import {PropertyProvider} from "../../../providers/property/property";
import {ToastComponent} from "../../../components/toast/toast";
import {PassengerPage} from "../passenger";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import { Content,List } from 'ionic-angular';
import {NativeProvider} from "../../../providers/native/native";
import {animate, state, style, transition, trigger} from "@angular/animations";
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
  animations: [
    trigger('animation', [
      state('open', style({ opacity: 1,  height: '*'})),
      state('close', style({ opacity: 0, height: '0'})),
      transition('open => close', animate('.3s ease-in')),
      transition('close => open', animate('.3s ease-out')),
    ])
  ]
})
export class MypassengerPage {
  // show=false;
  // houseType=false;
  // more=false;
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
  @ViewChild('navbar') navBar: Navbar;
  date:any;
  constructor(public navCtrl: NavController,
              public statusBar: StatusBar,public  nativeProvider:NativeProvider,
              public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams,private customerProvider:CustomerProvider,
              public propertyProvider: PropertyProvider,public toast:ToastComponent,
              public localStorageProvider: LocalStorageProvider,public events: Events) {

    // this.customerProvider.area().then(res=>{
    //   this.area = res.data.distrs;
    //   if(this.area){
    //     this.area.unshift({name:'不限',id:'99'});
    //   }
    // });
    if(!this.localStorageProvider.get('area')){
      //行政区划
      this.propertyProvider.getDivision().then(res=>{
        console.log('行政区划',res);
        this.area = res.data.result[0];
        this.localStorageProvider.set('area',this.area);
        this.area&&this.area.unshift({name:'不限',id:'99',code:'0'});
      });
    }else {
      this.area = this.localStorageProvider.get('area');
      this.area&&this.area.unshift({name:'不限',id:'99',code:'0'});
    }
  }
  @ViewChild('myTabs') tabRef: Tabs;
  @ViewChild('Content') content: Content;
  ionViewDidLoad() {
    this.search();
    this.navBar.backButtonClick = () => {
      this.navCtrl.setRoot(PassengerPage)
    };
    //动画初始化
    for(var i = 1 ;i<4;i++){
      this.states[i]='close'
    }

  }
  ionViewDidEnter() {
    // this.navBar.backButtonClick = () => {
    //   // this.navCtrl.push(PassengerPage);
    //   // this.navBarShow = false;
    //   this.navCtrl.pop({animate:false});
    //
    // };
  }
  scrollHandler(event) {
    // console.log(`ScrollEvent: ${event}`);
// this.content.scrollToTop();
//     this.content.scrollTo(0, 500, 200);
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  navbar=true;
  ionViewWillUnload(){
    // window.history.back();
    this.navbar =false;
    // ;alert('4545')
  }
  ionViewWillLeave(){

  }

  selected :any;
  isActive(item) {
    return this.selected === item;
  };
  searchDict = '';
  choseDivision=false;
  //搜索房源——区域——商圈
  go(item) {
    this.choseDivision = false;
    if(item.id == '99'){
      this.params.intentionDiviCode ='0';
      this.params.intentionTradeCode = '0';
      // this.searchArea = '不限';
      this.district = [];
      this.search();
      this.choseDivision = true;
    }

    this.searchArea = item.name;
    this.selected = item;//激活css选中状态
    //用code值匹配相应商圈
    this.district = [];
    for(var i of this.area){
      if(item.code==i['code']){
        this.district = i['area'];
        if(this.district!=undefined){
          this.district.unshift({name:'不限',code:'0'});
          this.district = this.uniqueArray(this.district,'name');
        }else {
          this.district = [];
        }
      }
    }
    this.params.intentionDiviCode = item.code;
  }

  uniqueArray(array, key){
    var result = [array[0]];
    for(var i = 1; i < array.length; i++){
      var item = array[i];
      var repeat = false;
      for (var j = 0; j < result.length; j++) {
        if (item[key] == result[j][key]) {
          repeat = true;
          break;
        }
      }
      if (!repeat) {
        result.push(item);
      }
    }
    return result;
  }


  tagList(item){
    //列表标签
    var start=new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);
    var todayzero=start.getTime();
    if(item.createTime && item.lastFollowTm && item.lastFollowTm<=todayzero-1000-(1000*60*60*24*3) &&
      item.createTime<=todayzero-1000-(1000*60*60*24*3)){
      item.followLabel=1;
      return 'followLabel';
    }
    if(item.custFollowupInfoEntity&&item.custFollowupInfoEntity.appointmentTm){
      // debugger;
      // console.log('1',new Date(1536595200000).toISOString(),'>=',new Date(todayzero).toISOString(),'<=',new Date(todayzero-1000+(1000*60*60*24*3)).toISOString());
      if(item.custFollowupInfoEntity.appointmentTm && item.custFollowupInfoEntity.appointmentTm>=todayzero && item.custFollowupInfoEntity.appointmentTm<=todayzero-1000+(1000*60*60*24*3)) {
        if (item.custFollowupInfoEntity.followStatus == 1) {
          item.lookLable = 1;
          return 'lookLable';
        }
      }
    }
  }

  /**
   * 列表搜索
   */
  search(){
/*
    if(this.params.intentionDiviCode=='99'){
      this.params.intentionDiviCode='0';
    }*/
// this.scrollToTop();
    this.pageData = null;
    this.hasData  = true;
    console.log('搜索',this.params);
     // this.content.scrollToTop();
    this.customerProvider.pageSearch(1,this.params).then(res=>{
      this.pageData = res.data.result;
      this.totalPages = res.data.totalPages;

      if(res.data.result){
        this.hasData  = true;
        this.firstPageData = res.data.result;
        this.currentPage=1;
        this.pageResult =res.data&&res.data.result;
        if(res.data.result.length<10){ this.all = true;}
      }else{
        this.hasData = false;
      }

      //关闭搜索框子
      // this.show = false;
      // this.houseType = false;
      // this.more = false;
      // this.pop = false;
      this.allClose();
      // this.housingEstate = false;
      //户型搜索条件字显示
    });
  }

  searchArea='';
  selectArea(items){

    if(items.code!='0'){ this.searchArea= items.name;}
    console.log('商圈',items);
    this.search();
  }
  sx=1;
  sxClick(){
    if(this.sausage[1]){this.params.todayNoFollow='1'}else if(!this.sausage[1]) {delete this.params.todayNoFollow }
    if(this.sausage[2]){this.params.threeDayNoFollow='2'}else if(!this.sausage[2]) {delete this.params.threeDayNoFollow }
    if(this.sausage[3]){this.params.todayNoLook='3'}else if(!this.sausage[3]) {delete this.params.todayNoLook }
    if(this.sausage[4]){this.params.threeDayNoLook='4'}else if(!this.sausage[4]) {delete this.params.threeDayNoLook }
    // debugger;
    if(!this.params.todayNoFollow &&!this.params.threeDayNoFollow&&!this.params.todayNoLook&&!this.params.threeDayNoLook ){
      this.sx=1;
    }else {
      this.sx=2;
    }

    this.search();
    //关闭搜索框子
    // this.show = false;
    // this.houseType = false;
    // this.more = false;
    // this.pop = false;
    // this.allClose()

  }

  // checks:boolean;
  sausage=[];
  info:any;
  updateCucumber(val,index) {
    console.log(this.sausage)
    this.values=val;
    this.sx=1;
    // for(var i in this.sausage){
    //   if(this.sausage[i]==false){
    //     this.sx=1;
    //   }else{
    //     this.sx=2;
    //   }
    // };
    // console.log(this.sausage)

  }

  //重置
  reset(){
    // console.log('清除',this.sausage);
    for(var i in this.sausage){
      this.sausage[i]=false;
    };
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
    {name:'筛选',val:0},
    {name:'今日未跟进',val:1},
    {name:'超过三日未跟进',val:2},
    {name:'今日有约看',val:3},
    {name:'三日内有约看',val:4},
  ];

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
  pageResult:any;
  //上拉加载
  doInfinite(infiniteScroll) {
   console.log('currentPage:',this.currentPage,'totalPages',this.totalPages);
    infiniteScroll.complete();
    this.currentPage<=this.totalPages&&this.currentPage++;
    // console.log('当前页数',this.currentPage);
    if(this.pageResult&&this.pageResult.length<10){
      //toast提示
      this.all = true;
      return
    }else {
      this.all = false;
      if(this.currentPage>this.totalPages){this.all = true; return}
      this.customerProvider.pageSearch(this.currentPage,this.params).then(res=>{
        this.pageResult =res.data&&res.data.result;
        for(let i=0;i<res.data.result.length;i++){
          this.pageData.push(res.data.result[i]);
        }
      });
    }
    // console.log('Async operation has ended');
    infiniteScroll.complete(function () {
      // console.log('数据请求完成');
    });

  }
  searchFloorNum = 0; //初始化搜索次数
  totalRecords :any;//查询到的总条数；
  firstPageData = [];
  //下拉刷新
  num :any;
  timer:any;
  not=false;
  haveData=false;
  newCount:any;
  doRefresh(refresher) {
    console.log(this.params);
    console.log('上拉刷新Begin async operation', refresher);
    this.customerProvider.pageSearch(1,this.params).then(res=>{
      console.log('结束时间内容',res.data.totalRecords);

      this.totalRecords = res.data.totalRecords;
      this.pageData = res.data.result;
      this.totalPages = res.data.totalPages;
      let newCount = this.checkUpdateCount(res.data.result);
      this.newCount=newCount;
      this.firstPageData = res.data.result;
      console.log('Async operation has ended');
      refresher.complete();
      this.pageResult =res.data&&res.data.result;
      if (res.data.result && res.data.result.length > 0) {
        this.pageData = [];
        for (let i = 0; i < res.data.result.length; i ++) {
          this.pageData.push(res.data.result[i])
        }
        this.currentPage =1;
        this.hasData = true;
      }else {
        this.hasData = false;
      }



      if (newCount > 0 ) {
        console.log(newCount)
        // this.toast.defaultMsg('middle','已更新'+ newCount +'条记录');
        this.num=3;
        this.haveData=true;
        this.timer=setInterval(()=>{
          this.num--;
          if(this.num===0){
            this.haveData=false;
            window.clearInterval(this.timer);
          }
        },1000);
      } else {
        // this.toast.defaultMsg('middle','暂无更新');
        this.not=true;
        this.num=3;
        this.timer=setInterval(()=>{
          this.num--;
          // console.log(this.num)
          if(this.num===0){
            this.not=false;
            window.clearInterval(this.timer);
          }
        },1000);
      }
    }).catch(err=>{
      if(err){
        refresher.complete();
      }
    });
  }

  checkUpdateCount(result) {
    let count = 0;
    result = result || [];
    this.firstPageData = this.firstPageData || [];
    for (let item in result) {
      var rs = this.firstPageData.find(firstData => firstData.customerId == result[item].customerId ) || [];
      if (rs.length == 0) {
        count ++;
      }
    }
    return count;
  }

//menu
  states=[];
  toggleNum:any;
  toggleSta(num){
    this.toggleNum=num;
    if(this.states[num]=='close'){
      for(var i=1;i<4;i++){
        if(i!=num){
          this.states[i] = this.states[i] === 'open' ? 'close' : 'close';
        }
      }
      this.states[num] = this.states[num] === 'close' ? 'open' : 'close';
      this.pop=true;
    }else  {
      this.states[num] = this.states[num] === 'open' ? 'close' : 'close';
      this.pop=false;
    }
  }
  allClose(){
    this.states[this.toggleNum] = this.states[this.toggleNum] === 'open' ? 'close' : 'close';
    this.pop=false;
  }


  // showMenu1(){
  //   if(this.show==false || this.houseType == true || this.more == true ){
  //     this.show=true;
  //     this.pop=true;
  //     this.houseType = false;
  //     this.more=false;
  //   }else{
  //     this.show=false;
  //     this.pop=false;
  //   }
  // }
  // showMenu2(){
  //   if(this.houseType==false || this.show == true || this.more == true ){
  //     this.houseType=true;
  //     this.show=false;
  //     this.pop=true;
  //     this.more = false;
  //   }else{
  //     this.houseType = false;
  //     this.pop=false;
  //   }
  // }
  // showMenu3(){
  //   if(this.more==false || this.show == true || this.houseType == true){
  //     this.more=true;
  //     this.show=false;
  //     this.pop=true;
  //     this.houseType = false;
  //   }else{
  //     this.more = false;
  //     this.pop=false;
  //   }
  // }
  // pops(){
  //   if(this.more==true || this.show == true || this.houseType == true){
  //     this.more=false;
  //     this.show=false;
  //     this.pop=false;
  //     this.houseType = false;
  //   }
  // }
  addpassenger(){
    this.events.subscribe('bevents',(params)=>{
      console.log('接受数据',params); //propertyId
      if(params.reload){this.search()}
      // this.getHouseData(params.propertyId,false);
      this.events.unsubscribe('bevents');
    });
    this.nativeProvider.openWin(this.navCtrl,AddpassengerPage)
  }

  gopassengerDetail(item){
    this.nativeProvider.openWin(this.navCtrl,PassengerdetailPage,{customerId:item.customerId});
  }
  goFollow(item,slidingItem){
    this.nativeProvider.openWin(this.navCtrl,PassengerfollowPage,{
      item:item,
    });
    slidingItem.close();
  }
  golook(item,slidingItem){
    this.nativeProvider.openWin(this.navCtrl,PassengerlookPage,{
      item:item,
    });
    slidingItem.close();
  }
  closePrivateGuest(item,slidingItem){
    this.nativeProvider.openWin(this.navCtrl,CloseprivateguestPage,{
      item:item,
    });
    slidingItem.close();
  };



  setRoot(goPage, param = {}) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage, param, {animate:false});
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
  threeDayNoFollow?:string;
  threeDayNoLook?:string;
  todayNoFollow?:string;
  todayNoLook?:string;
}
