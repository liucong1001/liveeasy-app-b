import {Component, Renderer, ViewChild} from '@angular/core';
import {Navbar, NavController, Searchbar} from 'ionic-angular';
import { MsgdetailPage } from './msgdetail/msgdetail';
import {HomeProvider} from "../../providers/home/home";
import {AddhousePage} from "../housing/addhouse/addhouse";
import {AddpassengerPage} from "../passenger/mypassenger/addpassenger/addpassenger";
import {DeclarationPage} from "./declaration/declaration";
import {AllsearchPage} from "../allsearch/allsearch";
import {StatusBar} from "@ionic-native/status-bar";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {CheckhousePage} from "./checkhouse/checkhouse";
import {HomesearchPage} from "./homesearch/homesearch";
import {TabsPage}from "./../tabs/tabs";
import {StatisticsPage} from "./statistics/statistics";
import {CodeValuePipe} from "../../pipes/code-value/code-value";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  associate=false;
  pop=false;
  notificationNews = [];
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild('searchBar') searchBar:Searchbar;
  codeData:any;
  code:any;
  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,
              public homeProvider:HomeProvider,public statusBar: StatusBar,  private renderer:Renderer,
              public localStorageProvider: LocalStorageProvider,
             ) {
    this.localStorageProvider.del('searchMoreData');
    //获取待办消息接口
    this.homeProvider.msgs(1,{operationCode:this.code }).then(res =>{
      console.log(res);
    });
    this.homeProvider.getCode().then(res=>{
        if(res.success){
          this.localStorageProvider.set('codeData', JSON.parse(res.data) );
          var data= JSON.parse(res.data);
          console.log(data)
        }
    });
  }



  //状态栏文字颜色修改-黑色
  ionViewWillEnter() {
    this.statusBar.styleDefault();

  }
  ionViewDidLoad(){
    this.homeProvider.getNotification().then(res=>{
      if(res){this.notificationNews = res.data.result;}
      console.log('new',this.notificationNews);
    });
  }

  //禁用调出键盘
  ionViewDidEnter(){
    let input = this.searchBar.getElementRef().nativeElement.querySelector('input');
    this.renderer.setElementAttribute(input, 'disabled', 'true');

    // this.navBar.backButtonClick = () => {
    //   this.navCtrl.push(HomesearchPage);
    // };

  }

  addhouse(){
    this.openWin(AddhousePage)
  }
  addpassenger(){
    this.openWin(AddpassengerPage)
  }
  msgDetail(){
    this.notificationNews&&this.openWin(MsgdetailPage);
  }
  checkhouse(i){
      this.openWin(CheckhousePage,{
        item:i,
        val:i.val,
      });
  }
  //
  houseJSON=[
    {name:'关闭房源审核',val:'1',icon:'tixing',code:'3004'},
    {name:'房源调整',val:'2',icon:'notice1',code:'3030'},
    {name:'关闭房源',val:'3',icon:'tixing',code:'3005'},
  ]
  gosta(){
    this.openWin(StatisticsPage);
  }
  godeclara(){
    this.openWin(DeclarationPage)
  }
  floorName = '';
  search(){
    this.openWin(HomesearchPage,{floorName:this.floorName})
  }

  gohomeSource(){
    console.log('房源列表');
    this.navCtrl.parent.select(1);
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
