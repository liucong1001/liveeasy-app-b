import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {HomeProvider} from "../../../providers/home/home";
import {CustomerProvider} from "../../../providers/customer/customer";
import {PropertyProvider} from "../../../providers/property/property";
import {DeclardetailPage} from "./declardetail/declardetail";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {ArryCodeValuePipe} from "../../../pipes/arry-code-value/arry-code-value";

/**
 * 报单列表
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-declaration',
  templateUrl: 'declaration.html',
})
export class DeclarationPage {
  show=false;
  houseType=false;
  more=false;
  pop=false;
  pageData = [];
  totalPages:number;//总页数
  /**
   * 列表搜索条件
   */
  hasData = true;
  /**
   * 列表搜索条件
   * @type {{}}
   */
  params:CustomerPageParams = {
    // orderStatus:'5' //居室
  };
  localCode:any;
  @ViewChild(Navbar) navBar: Navbar;
  stateJSON:any;
  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams,public statusBar: StatusBar,
              private customerProvider:CustomerProvider,private homeProvider:HomeProvider,
              public propertyProvider: PropertyProvider,public localStorageProvider: LocalStorageProvider) {
    this.localCode = this.localStorageProvider.get('codeData');
    this.stateJSON = new ArryCodeValuePipe().transform(this.localCode,'order_status');
    console.log(this.stateJSON)
  }

  ionViewDidLoad() {
    this.search();
    this.navBar.backButtonClick = this.backButtonClick;
  }
//状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();

  }
  selected :any;
  isActive(item) {
    return this.selected === item;
  };


  /**
   * 列表搜索
   */
  search(){
    this.pageData = null;
    this.hasData  = true;
    // console.log(this.params);
    this.homeProvider.successOrder(1,this.params).then(res=>{
      this.pageData = res.data.result;
      // console.log(res)
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
      if(this.searchFloorNum ==1){
        this.searchFloorNum = 2;
      }
    });
  }

  // sxClick(){
  //   this.pageData = null;
  //   this.hasData  = true;
  //   console.log('搜索',this.params);
  //   this.customerProvider.pageSearch(1,this.params).then(res=>{
  //     this.pageData = res.data.result;
  //     this.totalPages = res.data.totalPages;
  //
  //     if(res.data.hasOwnProperty('result')){
  //       this.hasData  = true;
  //     }else{
  //       this.hasData = false;
  //     }
  //
  //     //关闭搜索框子
  //     this.show = false;
  //     this.houseType = false;
  //     this.more = false;
  //     this.pop = false;
  //     // this.housingEstate = false;
  //     //户型搜索条件字显示
  //     if(this.sx ==1){
  //       this.sx = 2;
  //     }
  //   });
  // }
  sx=0;
  //重置
  // reset(){
  //   this.params = {
  //   };
  //   this.search();
  // }


  timerJson = [
    {name:'今日未跟进',val:1},
    {name:'超过三日未跟进',val:2},
    {name:'今日有约看',val:3},
    {name:'三日内有约看',val:4},
  ];

  //报单状态
  housePipe(data){
    for(var i in this.stateJSON){
      if(data == this.stateJSON[i].val){
        return this.stateJSON[i].name;
      }
    }
  }

  //报单时间
  filtrate(data){
    for(var i in this.timerJson){
      if(data == this.timerJson[i].val){
        return this.timerJson[i].name;
      }
    }
  }

  statpipe(val){
    for(var i in this.stateJSON){
      if(val == this.stateJSON[i].val){
        return this.stateJSON[i].name;
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
      console.log('当前页数',this.currentPage);
      if(this.currentPage >=this.totalPages+1){
        //toast提示
        this.all = true;
      }else {
        this.all = false;
        this.homeProvider.successOrder(this.currentPage,this.params).then(res=>{
          // console.log(res)
          for(let i=0;i<res.data.result.length;i++){
            this.pageData.push(res.data.result[i]);
          }
        });

      }

      // console.log('Async operation has ended');
      infiniteScroll.complete(function () {
        // console.log('数据请求完成');
      });
    }, 1000);

  }
  searchFloorNum = 0; //初始化搜索次数


  pageResult :any;
  totalRecords:any;
  newCount:any;
  firstPageData = [];
  badHttp = false;
  num :any;
  haveData=false;
  timer:any;
  not=false;
  doRefresh(refresher) {

    if(refresher.pullingIcon !='arrow-dropdown'){
      // alert(2);
      refresher.pullingText='松开推荐'
    }
    this.homeProvider.successOrder(1,this.params).then(res=>{
      this.totalRecords = res.data.totalRecords;
      this.totalPages = res.data.totalPages;
      let newCount = this.checkUpdateCount(res.data.result);
      this.newCount=newCount;
      this.firstPageData = res.data.result;
      refresher.complete();
      if (res.data.result && res.data.result.length > 0) {
        this.pageData = [];
        for (let i = 0; i < res.data.result.length; i ++) {

          this.pageData.push(res.data.result[i])
        }
        this.currentPage =1;
        this.badHttp = false;
      }

      if (newCount > 0 ) {
        this.num=3;
        this.haveData=true;
        this.timer=setInterval(()=>{
          this.num--;
          if(this.num===0){
            this.haveData=false;
            window.clearInterval(this.timer);
          }
        },1000);
        // this.toast.defaultMsg('middle','已更新'+ newCount +'条记录');
      } else {
        // this.toast.defaultMsg('middle','暂无更新111');
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
        this.badHttp = true;
        refresher.complete();
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





  //menu
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

  declarationDetail(item){
    this.openWin(DeclardetailPage,{
      id:item.orderId,
    })
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
 * 定义搜索参数类
 */
class CustomerPageParams {
  // orderStatus:string;
}
