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
import {PropertyProvider} from "../../providers/property/property";
import {ArryCodeValuePipe} from "../../pipes/arry-code-value/arry-code-value";
// import { JPush } from 'ionic3-jpush';
import { JPush } from '@jiguang-ionic/jpush';
import { Device } from '@ionic-native/device';
import {AppVersion} from "@ionic-native/app-version";
import {HTTP} from "@ionic-native/http";
import {VersionProvider} from "../../providers/version/app.version";
import { ENV } from '@app/env';
import {ToastComponent} from "../../components/toast/toast";
import {jpushUnit} from "../../providers/native/jpush-unit";
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
  check=[];
  adjust=[];
  close=[];
  addHomeTag = [] ;
  res=[];
  data:any;
  tests=[];
  noticeList = [];
  //app 更新
  private versionJsonUrl : any;
  versionNumber :string;
  versionInfo:any;
  aLinKDownload:string;
  aLinKDownloadVersion:string;
  model:any;

  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,
              public homeProvider:HomeProvider,public statusBar: StatusBar,  private renderer:Renderer,
              public localStorageProvider: LocalStorageProvider,public propertyProvider:PropertyProvider,
              public jpush: JPush, device: Device,private appVersion: AppVersion,private http: HTTP,
              private appUpdate: VersionProvider,public toast:ToastComponent,private jpushUnit:jpushUnit
             ) {
    this.model = ENV.mode;
    this.localStorageProvider.del('searchMoreData');
    //获取待办消息接口-
    this.propertyProvider.getCode().then(res=>{
        if(res.success){
           this.localStorageProvider.set('codeData', res.data.result);

          //添加，修改房源的标签 (不存在学区房)
          var tagsList = new ArryCodeValuePipe().transform(this.localStorageProvider.get('codeData'),'property_tag_desc');
          for(var item of tagsList){
            if( parseFloat(item['val'])<=64&&parseFloat(item['val'])!=8){
              this.addHomeTag.push(item);
            }
          }
          this.localStorageProvider.set('tagsList',this.addHomeTag);
        }
    });
    /*消息推送配置**/
    this.jpushUnit.initPush();
    console.log('设置别名--------',this.localStorageProvider.get('loginInfo')['user']['id']);
     this.jpushUnit.setAlias(this.localStorageProvider.get('loginInfo')['user']['id']);    //设置别名
     // this.jpushUnit.getAlias();
  }





  //状态栏文字颜色修改-黑色
  ionViewWillEnter() {
    this.statusBar.styleDefault();

  }
  msgResult=[];
  ionViewDidLoad(){
    this.homeProvider.getNotification().then(res=>{
      if(res){this.notificationNews = res.data.result;}
    });
    this.homeProvider.msgs(1).then(res=>{
      if(res.data.result){
        this.msgResult=res.data.result;
        // console.log(this.msgResult)
      }
    });
  }

  //禁用调出键盘
  ionViewDidEnter(){
    let input = this.searchBar.getElementRef().nativeElement.querySelector('input');
    this.renderer.setElementAttribute(input, 'disabled', 'true');
  }

/*  addhouse(){
    this.openWin(AddhousePage)
  }
  addpassenger(){
    this.openWin(AddpassengerPage)
  }*/
  msgDetail(){
    this.notificationNews&&this.openWin(MsgdetailPage);
  }

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
    this.navCtrl.parent.select(1);
  }

  goNotice(){
    this.openWin(CheckhousePage,);
  }
  getRegistrationID(){
    this.jpushUnit.getRegistrationID();
  }


//------跳转页面过渡--------//
  openWin(goPage, param = {}) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      // duration: 100,
      // slowdownfactor: -1,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage, param, {animate:false});
  }

}
