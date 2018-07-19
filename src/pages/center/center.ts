import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content ,ModalController} from 'ionic-angular';
import { AboutusPage } from './aboutus/aboutus';
import { HelpPage } from './help/help';
import { UpdatepwdPage } from './updatepwd/updatepwd';
import { MyaccountPage } from './myaccount/myaccount';
import {AccountPage} from "../account/account";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {VersionProvider} from "../../providers/version/app.version";
import {HTTP} from "@ionic-native/http";
import {AppVersion} from "@ionic-native/app-version";

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
  custposName:any;
  @ViewChild(Content) content: Content;
  private versionJsonUrl : any;
  versionNumber :string;
  versionInfo:any;
  aLinKDownload:string;
  aLinKDownloadVersion:string;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams,public localStorageProvider:LocalStorageProvider,
              public nativePageTransitions: NativePageTransitions,
              public statusBar: StatusBar, private appUpdate: VersionProvider,private http: HTTP,
              private appVersion: AppVersion,
  ) {

    // this.photo = this.localStorageProvider.get('loginInfo').photo;
    this.name = this.localStorageProvider.get('loginInfo').name;
    this.gh=this.localStorageProvider.get('loginInfo').no;
    this.custposName =this.localStorageProvider.get('loginInfo') .custPosName
    this.photo = 'assets/imgs/center.jpg';
    this.localStorageProvider.del('searchMoreData');
    this.versionJsonUrl = "https://www.pgyer.com/apiv2/app/listMy";


    console.log('检测新版本');
    this.appVersion.getVersionNumber().then(res=>{
      this.versionNumber =res;
      console.log('getVersionNumber',res);
    });

    /**
     * 获取最新版本
     */
    var params={
      _api_key:'14eca046de7309cd5125d4e3bdb1afd1',
      page:'1',
      // APPKEY:'42d16b350c365b3dd38f471fd5c102bb',
    };
    this.http.post(this.versionJsonUrl,params,{
      "content-type":"application/json"
    }).then(data  => {
      var res;
      res = JSON.parse(data.data);
      console.log('检测',res);
      let versionInfo = res.data.list[0];
      this.versionInfo = res.data.list[0];
      console.log('最新版本',versionInfo);
      if (data && data.status && data.status == 200 && data.data) {
        // let result = data.data || {};
         versionInfo.url ="https://www.pgyer.com/apiv2/app/install?appKey=9db9597481973c878648387bf30eaca0&_api_key=14eca046de7309cd5125d4e3bdb1afd1";
        // if (typeof result == "string") {
        //   result = eval("("+ result +")");
        // } buildVersion
        // let versionInfo = data.data.list[0].buildVersionNo;
        console.log('最新版本',versionInfo);
        // versionInfo.url = 'https://www.pgyer.com/apiv2/app/install?appKey='+versionInfo.appKey+'&_api_key='+params._api_key;
        console.log('a标签11url', versionInfo.url);
        this.aLinKDownload = versionInfo.url;
        this.aLinKDownloadVersion = versionInfo.buildVersion;

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

  goaccount(){
    this.openWin(MyaccountPage);
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
    let myModal = this.modalCtrl.create(AccountPage);
    myModal.present();
    // this.navCtrl.push(AccountPage);
    this.navCtrl.swipeBackEnabled = false; //ios禁用右滑返回
  }

  updateVersion(){
    console.log('开始检测版本更新');
    this.appUpdate.checkVersion();
  }

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
