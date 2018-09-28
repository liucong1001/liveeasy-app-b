import {Component, Renderer, ViewChild,ElementRef } from '@angular/core';
import {Navbar, NavController, Platform, Searchbar, ViewController,ToastController } from 'ionic-angular';
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
              private geolocation: Geolocation
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
    console.log('定位！！！！！！！！');
  }
/*  getLocation(){
    let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};

    this.geolocation.getCurrentPosition(options).then((res) => {
      // resp.coords.latitude
      // resp.coords.longitude
      //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
      let location='lat '+res.coords.latitude+' lang '+res.coords.longitude;
      let toast = this.toastCtrl.create({
        message: location,
        duration: 3000
      });
      toast.present();

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }*/

  getLocationByBrowser() {
    let geolocation1 = this.geolocation1 = new BMap.Geolocation();
    geolocation1.getCurrentPosition((r) => {
      let mk = this.marker = new BMap.Marker(r.point, { icon: this.myIcon });
      if (geolocation1.getStatus() == BMAP_STATUS_SUCCESS) {
        this.map.addOverlay(mk);
        this.map.panTo(r.point, 16);
        console.log('浏览器定位：您的位置是 ' + r.point.lng + ',' + r.point.lat);
      }
      else {
        alert('failed' + this.geolocation1.getStatus());
      }
    }, { enableHighAccuracy: false })
  }
  getLocationByIp() {
    let myCity = new BMap.LocalCity();
    myCity.get(result => {
      let cityName = result.name;
      this.map.setCenter(cityName);
      console.log("当前定位城市:" + cityName);
    });
  }
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let locationPoint = new BMap.Point(resp.coords.longitude, resp.coords.latitude);
      let convertor = new BMap.Convertor();
      let pointArr = [];
      pointArr.push(locationPoint);
      convertor.translate(pointArr, 1, 5, (data) => {
        if (data.status === 0) {
          let marker = this.marker = new BMap.Marker(data.points[0], { icon: this.myIcon });
          this.map.panTo(data.points[0]);
          marker.setPosition(data.points[0]);
          this.map.addOverlay(marker);
        }
      })
      console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);
    })
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
    // this.navCtrl.push('AddhousePage',{})
    this.nativeProvider.openWin(this.navCtrl,AddhousePage);
  }

  goAddPassenger(){
    this.nativeProvider.openWin(this.navCtrl,AddpassengerPage);
  }

  gosta(){
    this.nativeProvider.openWin(this.navCtrl,StatisticsPage);
  }
  godeclara(){
    this.nativeProvider.openWin(this.navCtrl,DeclarationPage)
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
