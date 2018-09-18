import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {PublicCustomerProvider} from "../../../providers/public-customer/public-customer";
import {PropertyProvider} from "../../../providers/property/property";
import {CustomerProvider} from "../../../providers/customer/customer";
import {PublicpdetailPage} from "./publicpdetail/publicpdetail";
import {ToastComponent} from "../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {PassengerPage} from "../passenger";
import {NativeProvider} from "../../../providers/native/native";
import {animate, state, style, transition, trigger} from "@angular/animations";
/**
 公客列表
 */

@IonicPage()
@Component({
  selector: 'page-publicpassenger',
  templateUrl: 'publicpassenger.html',
  animations: [
    trigger('animation', [
      state('open', style({ opacity: 1,  height: '*'})),
      state('close', style({ opacity: 0, height: '0'})),
      transition('open => close', animate('.3s ease-in')),
      transition('close => open', animate('.3s ease-out')),
    ])
  ]
})
export class PublicpassengerPage {
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
  district= [];
  tradingArea = [];//商圈数组
  intentionTradeCodeId:string;  //用于转换商圈
  hasData = true;
  shangQuan = []; //商圈
  /**
   * 列表搜索条件
   * @type {{}}
   */
  params:PublicCustomerPageParams = {
    customerSrc:'0',
    // intentionDiviCode:'0',//区县
    // intentionRoom:'0', //居室
    // intentionTradeCode:'0',//商圈
    priceUnit:'1',
  };
  @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,public statusBar: StatusBar,
              public navParams: NavParams,public publicCustomerProvider:PublicCustomerProvider,
              public propertyProvider: PropertyProvider,private customerProvider:CustomerProvider,
              public toast:ToastComponent,public localStorageProvider: LocalStorageProvider,
              public  nativeProvider:NativeProvider) {

    this.customerProvider.tradingArea().then(res=>{
      this.tradingArea = res;
    });
    if(!this.localStorageProvider.get('area')){
      //行政区划
      this.propertyProvider.getDivision().then(res=>{
        this.area = res.data.result[0];
        this.localStorageProvider.set('area',this.area);
        this.area&&this.area.unshift({name:'不限',id:'99',code:'0'});
      });
    }else {
      this.area = this.localStorageProvider.get('area');
      this.area&&this.area.unshift({name:'不限',id:'99',code:'0'});
    }

  }

  ionViewDidLoad() {
    this.params.customerType='0';//默认展示店公客
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
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
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
      // this.searchArea = '不限';
      this.search();
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

  /**
   * 监听商圈id——code（转换）
   */
  // intentionTrade(event){
  //   console.log('商圈',event);
  //   for(var i in this.tradingArea){
  //     if(this.tradingArea[i].id == event){
  //       // this.params.intentionTradeCode = this.tradingArea[i].code;
  //     }
  //   }
  //    if(this.params.intentionDiviCode=='99'){
  //       this.params.intentionDiviCode='0';
  //     }
  // }
  /**
   * 列表搜索
   */
  search(){
    this.pageData = null;
    this.hasData  = true;
    if(this.params.intentionDiviCode=='99'){
      this.params.intentionDiviCode='0';
    }
    if(this.params.intentionDiviCode=='0'){delete  this.params.intentionDiviCode}
    if(this.params.intentionTradeCode=='0'){delete  this.params.intentionTradeCode}
    if(this.params.intentionRoom=='0'){delete  this.params.intentionRoom}


    // this.params.intentionDiviCode='0';
    this.publicCustomerProvider.pageSearch(1,this.params).then(res=>{
      this.pageData = res.data.result;
      this.totalPages = res.data.totalPages;

      if(res.data.hasOwnProperty('result')){
        this.hasData  = true;
        this.firstPageData = res.data.result;
        this.currentPage=1;
        this.pageResult =res.data&&res.data.result;
        if(res.data.result.length<10){ this.all = true;}
        console.log(this.hasData)
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
    console.log('商圈',items);
    if(items.code!='0'){ this.searchArea= items.name;}
    this.search();
  }

  sxClick(val){
    this.params.customerSrc = '0';
    this.params.orderBy= 'DESC';
    this.params.customerType=val;
    val== ''&& delete  this.params.customerType;
    this.search();
    console.log('搜索',this.params);
  }
  searchFloorNum = 0; //初始化搜索次数
  sx=0;
  values:any;
  sausage=[];
  info:any;


  //条数
  currentPage: number = 1;
  all = false;
  pageResult:any;
  //上拉加载
  doInfinite(infiniteScroll) {

      infiniteScroll.complete();
      this.currentPage<=this.totalPages&&this.currentPage++;
      if(this.pageResult&&this.pageResult.length<10){
        //toast提示
        this.all = true;
      }else {
        this.all = false;
        if(this.currentPage>this.totalPages){this.all = true; return}
        this.publicCustomerProvider.pageSearch(this.currentPage,this.params).then(res=>{
          this.pageResult =res.data&&res.data.result;
          for(let i=0;i<res.data.result.length;i++){
            this.pageData.push(res.data.result[i]);
          }
        });

      }

      console.log('Async operation has ended');
      infiniteScroll.complete(function () {
        console.log('数据请求完成');
      });


  }

  totalRecords :any;//查询到的总条数；
  firstPageData = [];
  //下拉刷新
  num :any;
  timer:any;
  not=false;
  haveData=false;
  newCount:any;
  doRefresh(refresher) {
    console.log(this.params)
    console.log('上拉刷新Begin async operation', refresher);

    this.publicCustomerProvider.pageSearch(1,this.params).then(res=>{
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
      }

      if (newCount > 0 ) {
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

  //进入详情页
  gopassengerDetail(item){
    this.nativeProvider.openWin(this.navCtrl,PublicpdetailPage, {
      item:item,
      customerId:item.customerId,
    });
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
    {name:'全部',val:''},
    {name:'店公客',val:'0'},
    {name:'区公客',val:'2'},
    {name:'城市公客',val:'3'},
  ];
  //户型转换
  housePipe(data){
    for(var i in this.houseJSON){
      if(data == this.houseJSON[i].val){
        return this.houseJSON[i].name;
      }
    }
  }
  filtrate(data){
    for(var i in this.filtrateJson){
      if(data == this.filtrateJson[i].val){
        return this.filtrateJson[i].name;
      }
    }
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

  gopublicpasger(){
    this.nativeProvider.openWin(this.navCtrl,PublicpassengerPage)
  }

}



/**
 * 公客搜索条件类
 */
class  PublicCustomerPageParams {
  customerSrc?:string;
  orderBy?:string;
  intentionDiviCode?:string;
  intentionRoom?:string;
  intentionTradeCode?:string;
  priceUnit?:string;
  sort?:string;
  customerType?:string;
}
