import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar,ItemSliding  } from 'ionic-angular';
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
  @ViewChild('navbar') navBar: Navbar;

  constructor(public navCtrl: NavController,
              public statusBar: StatusBar,
              public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams,private customerProvider:CustomerProvider,
              public propertyProvider: PropertyProvider,public toast:ToastComponent,
              public localStorageProvider: LocalStorageProvider,) {

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
        this.area&&this.area.unshift({name:'不限',id:'99',code:'99'});
      });
    }else {
      this.area = this.localStorageProvider.get('area');
      this.area&&this.area.unshift({name:'不限',id:'99',code:'99'});
    }
  }

  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }
  ionViewDidLoad() {
    this.search();
    this.navBar.backButtonClick = this.backButtonClick;
  }
  ionViewDidEnter() {
    // this.navBar.backButtonClick = () => {
    //   // this.navCtrl.push(PassengerPage);
    //   // this.navBarShow = false;
    //   this.navCtrl.pop({animate:false});
    //
    // };
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
    // this.share(item);
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
      this.searchArea = '不限';
      this.district = [];
      this.search();
      this.choseDivision = true;
    }

    this.searchDict = item.name;
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

  /**
   * 列表搜索
   */
  search(){
    this.pageData = null;
    this.hasData  = true;
    this.params.intentionDiviCode='0';
    console.log('搜索',this.params);
    this.customerProvider.pageSearch(1,this.params).then(res=>{
      this.pageData = res.data.result;
      this.totalPages = res.data.totalPages;

      if(res.data.hasOwnProperty('result')){
        this.hasData  = true;
        this.firstPageData = res.data.result;
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
    });
  }
  searchArea='';
  selectArea(items){
    this.searchArea= items.name;
    this.search();
  }
  sxClick(){
    if(!this.values){
      this.values='0'
    }
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

      });
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
    if(this.info == false){
      this.sx=1
    }

  }
  // checks:boolean;
  sausage=[];
  info:any;
  updateCucumber(val,index) {
    this.values=val;
    this.info=this.sausage[index];
     if(this.sausage[1]){this.params.todayNoFollow='1'}else if(!this.sausage[1]) {delete this.params.todayNoFollow }
     if(this.sausage[2]){this.params.threeDayNoFollow='2'}else if(!this.sausage[2]) {delete this.params.threeDayNoFollow }
     if(this.sausage[3]){this.params.todayNoLook='3'}else if(!this.sausage[3]) {delete this.params.todayNoLook }
     if(this.sausage[4]){this.params.threeDayNoLook='4'}else if(!this.sausage[4]) {delete this.params.threeDayNoLook }
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
    {name:'筛选',val:0},
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
  //上拉加载
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
    this.openWin(AddpassengerPage)
  }
  gopassengerDetail(item){
    this.openWin(PassengerdetailPage,{customerId:item.customerId});
  }
  goFollow(item){
    this.openWin(PassengerfollowPage,{
      item:item,
    })
  }
  golook(item){
    this.openWin(PassengerlookPage,{
      item:item,
    })
  }
  closePrivateGuest(item){
    this.openWin(CloseprivateguestPage,{
      item:item,
    })
  };
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

//------跳转页面过渡--------//
  openWin(goPage, param = {}) {
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
