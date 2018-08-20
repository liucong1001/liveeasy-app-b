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
import { JPush } from 'ionic3-jpush';
import { Device } from '@ionic-native/device';
import {AppVersion} from "@ionic-native/app-version";
import {HTTP} from "@ionic-native/http";
import {VersionProvider} from "../../providers/version/app.version";
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
  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,
              public homeProvider:HomeProvider,public statusBar: StatusBar,  private renderer:Renderer,
              public localStorageProvider: LocalStorageProvider,public propertyProvider:PropertyProvider,
              public jPush: JPush, device: Device,private appVersion: AppVersion,private http: HTTP,private appUpdate: VersionProvider
             ) {
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
    // this.navCtrl.last()&&this.navCtrl.last().name=='ModalCmp'
    console.log('上一个页面11',this.navCtrl.last()&&this.navCtrl.last().name);

    this.versionJsonUrl = "https://www.pgyer.com/apiv2/app/listMy";

    this.appVersion.getVersionNumber().then(res=>{
      this.versionNumber =res; //当前版本
      console.log('getVersionNumber',res);
    });
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

    // this.navBar.backButtonClick = () => {
    //   this.navCtrl.push(HomesearchPage);
    // };

  /*
   获取最新版本*/

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
      // console.log('检测',res);
      let versionInfo = res.data.list[0];
      this.versionInfo = res.data.list[0];
      // console.log('最新版本',versionInfo);
      if (data && data.status && data.status == 200 && data.data) {
        // let result = data.data || {};
        versionInfo.url ="https://www.pgyer.com/apiv2/app/install?appKey=9db9597481973c878648387bf30eaca0&_api_key=14eca046de7309cd5125d4e3bdb1afd1";

        this.aLinKDownload = versionInfo.url;
        this.aLinKDownloadVersion = versionInfo.buildVersion;   //从网上获取最新版本号
        console.log('网上最新版本',this.aLinKDownloadVersion);
        if(this.aLinKDownloadVersion>this.versionNumber){
          // console.log('存在新版本!',this.aLinKDownloadVersion,this.versionNumber);
          // this.showNewVersion = true;
          // console.log('是否存在版本',this.showNewVersion);
          this.appUpdate.checkVersion();
        }
        // console.log('版本对比',this.aLinKDownloadVersion,this.versionNumber);

      }
    }).catch((e)=> {
      console.error(JSON.stringify(e));
    })



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
  //  (i){
  //   this.openWin(CheckhousePage,{
  //     item:i,
  //     val:i.val,
  //     res:this.res,
  //   });
  //
  // }

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
