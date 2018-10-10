import {Component, Renderer, ViewChild,ElementRef } from '@angular/core';
import {Navbar, NavController, Platform, Searchbar, ViewController, ToastController, Events} from 'ionic-angular';
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
import {NativeProvider} from "../../providers/native/native";
import { Geolocation } from '@ionic-native/geolocation';

declare var BMap;
declare var BMAP_STATUS_SUCCESS;

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
  AddhousePage:any;

  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  marker: any;//标记
  geolocation1: any;
  myIcon: any;

  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,
              public homeProvider:HomeProvider,public statusBar: StatusBar,  private renderer:Renderer,
              public localStorageProvider: LocalStorageProvider,public propertyProvider:PropertyProvider,
              public jpush: JPush, device: Device,private appVersion: AppVersion,private http: HTTP,
              private appUpdate: VersionProvider,public toast:ToastComponent,private jpushUnit:jpushUnit,
              public viewCtrl: ViewController,public platform: Platform,public  nativeProvider:NativeProvider,
              private geolocation: Geolocation,private events: Events
             ) {
    this.AddhousePage = AddhousePage;

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
    this.jpushUnit.initPush(this.navCtrl);
    this.platform.is('cordova')&&
    this.jpushUnit.setAlias(this.localStorageProvider.get('loginInfo')['user']['id']);    //设置别名
    this.myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(30, 30));
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
      }
    });
    this.receiveNotification();
    this.getLocal();

  }


  //首页home页面消息通知更新
  receiveNotification(){
    this.events.subscribe('jpush.receiveNotification', content => {
      this.homeProvider.msgs(1).then(res=>{
        if(res.data.result){
          this.msgResult= res.data.result;
        }
      });
    });
  }

  getLocal(){
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        // alert('您的位置是：'+r.point.lng+','+r.point.lat);
        console.log('您的位置是：'+r.point.lng+','+r.point.lat);
      }
      else {
        alert('failed'+this.getStatus());
      }
    },{enableHighAccuracy: true})
    //关于状态码
    //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
    //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
    //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
    //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
    //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
    //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
    //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
    //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
    //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
  }

  //禁用调出键盘
  ionViewDidEnter(){
    let input = this.searchBar.getElementRef().nativeElement.querySelector('input');
    this.renderer.setElementAttribute(input, 'disabled', 'true');
  }

  msgDetail(){
    this.notificationNews&&this.nativeProvider.openWin(this.navCtrl,MsgdetailPage);
  }
  goAddHouse(){
    // this.nativeProvider.openWin(this.navCtrl,AddhousePage);
    this.navCtrl.push(AddhousePage);
  }

  goAddPassenger(){
    // this.nativeProvider.openWin(this.navCtrl,AddpassengerPage);
    this.navCtrl.push(AddpassengerPage);
  }

  gosta(){
    this.navCtrl.push(StatisticsPage);
    // this.nativeProvider.openWin(this.navCtrl,StatisticsPage);
  }
  godeclara(){
    this.navCtrl.push(DeclarationPage);
    // this.nativeProvider.openWin(this.navCtrl,DeclarationPage)
  }
  floorName = '';
  search(){
    this.nativeProvider.openWin(this.navCtrl,HomesearchPage,{floorName:this.floorName})
  }

  gohomeSource(){
    this.navCtrl.parent.select(1);
  }

  goNotice(){
    this.nativeProvider.openWin(this.navCtrl,CheckhousePage,);
  }
  getRegistrationID(){
    this.jpushUnit.getRegistrationID();
  }

}
