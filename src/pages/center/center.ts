import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content ,ModalController} from 'ionic-angular';
import { AboutusPage } from './aboutus/aboutus';
import { HelpPage } from './help/help';
import { UpdatepwdPage } from './updatepwd/updatepwd';
import { MyaccountPage } from './myaccount/myaccount';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {VersionProvider} from "../../providers/version/app.version";
import {HTTP} from "@ionic-native/http";
import {AppVersion} from "@ionic-native/app-version";
import { App } from 'ionic-angular';
import {ConfigProvider} from "../../providers/config/config";
import {Platform } from 'ionic-angular';
import {ToastComponent} from "../../components/toast/toast";
import {LoginPage} from "../login/login";
import { ENV } from '@app/env'
import {Environment} from "../../environments/environment.model";
import {AttentionPage} from "./attention/attention";
/**
 * Generated class for the CenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-center',
  templateUrl: 'center.html',
})
export class CenterPage {
  photo:any;
  name:any;
  gh:any;
  positionCateName:any;
  @ViewChild(Content) content: Content;
  private versionJsonUrl : any;
  versionNumber :string;
  versionInfo:any;
  aLinKDownload:string;
  aLinKDownloadVersion:string;
  showNewVersion = false;
  ios = false;
  android = false;
  ENY:Environment;
  imgHeader:string; //线上图片默认头地址
  imgJson:any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams,public localStorageProvider:LocalStorageProvider,
              public nativePageTransitions: NativePageTransitions,
              public statusBar: StatusBar, private appUpdate: VersionProvider,private http: HTTP,
              private appVersion: AppVersion,private app:App,public configProvider:ConfigProvider,private platform: Platform,
              public toast:ToastComponent,

  ) {
    this.ENY = ENV;
    this.name = this.localStorageProvider.get('loginInfo').user.name;
    this.gh=this.localStorageProvider.get('loginInfo').user.no;
    this.positionCateName =this.localStorageProvider.get('loginInfo').user.positionCateName;
    if(this.localStorageProvider.get('loginInfo').user.photo){
      this.photo = this.localStorageProvider.get('loginInfo').user.photo;
    }

    console.log(this.photo);
    this.imgHeader = this.configProvider.set().img;

    this.localStorageProvider.del('searchMoreData');
    this.versionJsonUrl = "https://www.pgyer.com/apiv2/app/listMy";
    // console.log('检测新版本');
    this.appVersion.getVersionNumber().then(res=>{
      this.versionNumber =res; //当前版本
      // console.log('getVersionNumber',res);
    });
    if (this.platform.is('ios')) {
         // console.log('ios','ios平台');
         this.ios = true;
    } else if (this.platform.is('android')) {
        this.android = true;
        // console.log('android平台');
    }

    /**
     * 获取最新版本
     */
    var params={
      _api_key:this.ENY.apiKey,
      page:'1',
    };
    this.http.post(this.versionJsonUrl,params,{
      "content-type":"application/json"
    }).then(data  => {
      var res;
      res = JSON.parse(data.data);
      let versionInfo = res.data.list[0];
      this.versionInfo = res.data.list[0];
      // console.log('最新版本',versionInfo);
      if (data && data.status && data.status == 200 && data.data) {
        // let result = data.data || {};
         versionInfo.url ="https://www.pgyer.com/apiv2/app/install?appKey="+this.ENY.appKey+"&_api_key="+this.ENY.apiKey;


        this.aLinKDownload = versionInfo.url;
        this.aLinKDownloadVersion = versionInfo.buildVersion;   //从网上获取最新版本号
        if(this.aLinKDownloadVersion>this.versionNumber){
           // console.log('存在新版本!',this.aLinKDownloadVersion,this.versionNumber);
           this.showNewVersion = true;
           // console.log('是否存在版本',this.showNewVersion);
        }

      }
    }).catch((e)=> {
      console.error(JSON.stringify(e));
    })

  }
  ionViewWillEnter() {
    this.statusBar.styleDefault();
  }
  ionViewDidLoad() {
  }

  pic(data){
    // console.log('data',typeof (JSON.parse(data)) );
    if(JSON.parse(data)){
      return JSON.parse(data).imagePath+this.configProvider.set().smSign
    }else {
      return
    }

  }

  goaccount(){
    this.openWin(MyaccountPage);
  }
  attention(){
    this.openWin(AttentionPage)
  }
  aboutUs() {
    this.openWin(AboutusPage)
  }
  help() {
    this.openWin(HelpPage)
  }
  updatepwd() {
    this.openWin(UpdatepwdPage)
  }
  reset(){
    localStorage.clear();
    this.content.resize();
    // window.location.reload();
    // this.navCtrl.push(AccountPage);
    // this.app.getActiveNavs()[0].setRoot("AccountPage");
    // let myModal = this.modalCtrl.create(LoginPage);
    // myModal.present();
    this.app.getRootNavs()[0].setRoot(LoginPage);
    // this.navCtrl.push(AccountPage);
    this.navCtrl.swipeBackEnabled = false; //ios禁用右滑返回
  }

  ionViewDidEnter(){
    this.content.resize();
  }


  tip(){
    this.toast.defaultMsg('top','当前已经是最新版本！');
  }

  // updateVersion(){
  //   // console.log('开始检测版本更新1');
  //   this.appUpdate.checkVersion(true);
  // }

  openWin(goPage) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    };
    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage,{}, {animate: false});
  }
}
