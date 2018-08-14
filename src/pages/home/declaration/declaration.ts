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
    console.log(this.params);
    this.homeProvider.successOrder(1,this.params).then(res=>{
      this.pageData = res.data.result;
      console.log(res)
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
      if(this.currentPage >=this.totalPages){
        //如果都加载完成的情况，就直接 disable ，移除下拉加载
        infiniteScroll.enable(false);
        //toast提示
        this.all = true;
      }else {
        this.all = false;
        this.homeProvider.successOrder(this.currentPage,this.params).then(res=>{
          console.log(res)
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
      item:item,
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
