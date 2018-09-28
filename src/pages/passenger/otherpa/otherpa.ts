import { Component ,ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Navbar, ItemSliding, Tabs, Events} from 'ionic-angular';
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
  selector: 'page-otherpa',
  templateUrl: 'otherpa.html',
  animations: [
    trigger('animation', [
      state('open', style({ opacity: 1,  height: '*'})),
      state('close', style({ opacity: 0, height: '0'})),
      transition('open => close', animate('.3s ease-in')),
      transition('close => open', animate('.3s ease-out')),
    ])
  ]
})


export class OtherpaPage {
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
  }
  @ViewChild('myTabs') tabRef: Tabs;
  @ViewChild('Content') content: Content;
  ionViewDidLoad() {
    //动画初始化
    for(var i = 1 ;i<4;i++){
      this.states[i]='close'
    }

  }
  ionViewDidEnter() {
  }
  scrollHandler(event) {
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
    // debugger;
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
