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
/**
 公客列表
 */

@IonicPage()
@Component({
  selector: 'page-publicpassenger',
  templateUrl: 'publicpassenger.html',
})
export class PublicpassengerPage {
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
    intentionDiviCode:'0',//区县
    intentionRoom:'0', //居室
    intentionTradeCode:'0',//商圈
    priceUnit:'1',
    sort:'1',
    customerType:'1',
  };
  @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,public statusBar: StatusBar,
              public navParams: NavParams,public publicCustomerProvider:PublicCustomerProvider,
              public propertyProvider: PropertyProvider,private customerProvider:CustomerProvider,
              public toast:ToastComponent,public localStorageProvider: LocalStorageProvider,) {
    // this.customerProvider.area().then(res=>{
    //   this.area = res.data.distrs;
    //   if(this.area){
    //     this.area.unshift({name:'不限',id:'99'});
    //   }
    // });
    this.customerProvider.tradingArea().then(res=>{
      this.tradingArea = res;
    });
    if(!this.localStorageProvider.get('area')){
      //行政区划
      this.propertyProvider.getDivision().then(res=>{
        console.log('行政区划',res);
        this.area = res.data.data;
        this.localStorageProvider.set('area',this.area);
        this.area.unshift({name:'不限',id:'99',code:'99'});
      });
    }else {
      this.area = this.localStorageProvider.get('area');
      this.area.unshift({name:'不限',id:'99',code:'99'});
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosehousePage');
    this.search();
    this.navBar.backButtonClick = this.backButtonClick;
  }

  ionViewDidEnter() {
    // this.navBar.backButtonClick = () => {
    //   this.navCtrl.pop({animate:false});
    // };

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
      this.searchArea = '不限';
      this.search();
    }


    console.log('查询商圈',item);
    this.searchDict = item.name;
    this.selected = item;//激活css选中状态
    //用code值匹配相应商圈
    // this.district = [];
    // for(var i in this.tradingArea){
    //   if(this.tradingArea[i].code.substring(0,6) == item.code){
    //     this.district.push(this.tradingArea[i]);
    //   }
    // }
    // if(this.district.length>1){
    //   this.district.unshift({name:'不限',code:'0'});
    // }
    this.district = [];
    for(var i of this.area){
      if(item.code==i['code']){
        this.district = i['area'];
        if(this.district&&this.district.length>1){
          this.district.unshift({name:'不限',code:'0'});
        }
      }
    }

    this.params.intentionDiviCode = item.code;

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
  //
  // }
  /**
   * 列表搜索
   */
  search(){
    this.pageData = null;
    this.hasData  = true;
    console.log('搜索',this.params);
    this.publicCustomerProvider.pageSearch(1,this.params).then(res=>{
      this.pageData = res.data.result;
      this.totalPages = res.data.totalPages;

      if(res.data.hasOwnProperty('result')){
        this.hasData  = true;
        console.log(this.hasData)
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
      if(this.searchFloorNum ==2 && this.params.intentionRoom=='0'){
        this.searchFloorNum=1;
      }
    });
  }
  searchArea='';
  selectArea(items){
    this.searchArea= items.name;
    this.search();
  }
  sxClick(){
    this.pageData = null;
    this.hasData  = true;
    console.log('搜索',this.params);
    this.publicCustomerProvider.pageSearch(1,this.params).then(res=>{
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
      if(this.info ==false){
        this.sx=1;
      }
    });
  }
  searchFloorNum = 0; //初始化搜索次数
  sx=0;
  values:any;
  sausage=[];
  info:any;
  updateCucumber(val,index) {
    this.values=val;
    console.log('值' +val+this.sausage[index]);
    this.info=this.sausage[index];
    this.params.customerSrc = '0';
    this.params.orderBy= 'DESC';
    this.params.customerType = '1';
    if(val == 1){
      this.params.customerType='1';
    }else if(val == 2){
      this.params.customerType='2';
    }else if(val == 3){
      this.params.customerType='3';
    }
  }

  //重置
  reset(){
    console.log('清除',this.sausage);
    for(var i in this.sausage){
      this.sausage[i]=false;
    }
  }


  //重置
  // reset(){
  //   this.params = {
  //     customerSrc:'0',
  //     intentionDiviCode:'0',//区县
  //     intentionRoom:'0', //居室
  //     intentionTradeCode:'0',//商圈
  //     priceUnit:'1',
  //     sort:'1',
  //     sxShow:'1' //筛选
  //   };
  //   this.search();
  // }
  //条数
  currentPage: number = 1;
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
        this.publicCustomerProvider.pageSearch(this.currentPage,this.params).then(res=>{
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
      var rs = this.firstPageData.find(firstData => firstData.propertyId == result[item].propertyId ) || [];
      if (rs.length == 0) {
        count ++;
      }
    }
    return count;
  }

  //进入详情页
  gopassengerDetail(item){
    this.openWin(PublicpdetailPage, {
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
    {name:'全部',val:1},
    {name:'区公客',val:2},
    {name:'城市公客',val:3},

  ]
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
    if(this.searchFloorNum ==1){
      this.searchFloorNum = 1;
    }else {
      this.searchFloorNum =2;
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
    this.openWin(PublicpassengerPage)
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
