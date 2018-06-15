import { Component } from '@angular/core';
import {App, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import {AccountPage} from "../pages/account/account";
import {VersionProvider} from "../providers/version/app.version";
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {Device} from "@ionic-native/device";
import {HeaderColor} from "@ionic-native/header-color";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StartupPage} from "../pages/startup/startup";
import {HomePage} from "../pages/home/home";
import {AccountPage} from "../pages/account/account";

import {LocalStorageProvider} from "../providers/local-storage/local-storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AccountPage;
  // rootPage:any = HomePage;
  tagsList:any;
  selected:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private appUpdate: VersionProvider,public localStorageProvider: LocalStorageProvider,
              private androidPermissions: AndroidPermissions,
              private device: Device,
              private headerColor: HeaderColor,
              public app: App,
              private nativePageTransitions: NativePageTransitions) {
    //标签
    this.tagsList=this.localStorageProvider.get('tagsList');
    console.log(this.tagsList)
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // let status bar overlay webview
      statusBar.overlaysWebView(true);
      // set status bar to white
      // statusBar.backgroundColorByHexString('#ffffff');
      headerColor.tint('#DC143C');
      splashScreen.hide();
      //android 6 以上动态获取权限
      if (this.device.platform == "Android") {
        this.androidPermissions.requestPermissions([
          this.androidPermissions.PERMISSION.CAMERA,
          this.androidPermissions.PERMISSION.GET_ACCOUNTS,
          this.androidPermissions.PERMISSION.REQUEST_INSTALLPACKAGES,
          // this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          // this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
        ]);
      }
      //检测版本更新
      // appUpdate.checkVersion();
      //设置全局页面过渡
      // this.setPageTransition();
    });
  }

  setPageTransition() {
    //页面进入过渡
    this.app.viewWillEnter.subscribe(() => {
      let options: NativeTransitionOptions = {
        "direction"        : "left", // 'left|right|up|down', default 'left' (which is like 'next')
        "duration"         :  400, // in milliseconds (ms), default 400
        "slowdownfactor"   :   3, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
        "slidePixels"      :   20, // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
        "iosdelay"         :  100, // ms to wait for the iOS webview to update before animation kicks in, default 60
        "androiddelay"     :  150, // same as above but for Android, default 70
        "fixedPixelsTop"   :    0, // the number of pixels of your fixed header, default 0 (iOS and Android)
        "fixedPixelsBottom":   0 // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
      };

      this.nativePageTransitions.slide(options)
        .then(data=>{})
        .catch(e=>{});
      this.nativePageTransitions.executePendingTransition();
    });

    //页面离开过渡
    this.app.viewDidLeave.subscribe(() => {
      let options: NativeTransitionOptions = {
        "direction"        : "right", // 'left|right|up|down', default 'left' (which is like 'next')
        "duration"         :  400, // in milliseconds (ms), default 400
        "slowdownfactor"   :   3, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
        "slidePixels"      :   20, // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
        "iosdelay"         :  100, // ms to wait for the iOS webview to update before animation kicks in, default 60
        "androiddelay"     :  150, // same as above but for Android, default 70
        "fixedPixelsTop"   :    0, // the number of pixels of your fixed header, default 0 (iOS and Android)
        "fixedPixelsBottom":   0 // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
      };

      this.nativePageTransitions.slide(options)
        .then(data=>{})
        .catch(e=>{});
    });

    this.nativePageTransitions.cancelPendingTransition();
  };
  go(item){
    this.selected = item;
  }
  isActive(item) {
    // return this.selected == item;
  };
  //更多
  //其他
  qtJSON = [
    {name:'只看我的房源',val:0},
    {name:'待处理关闭申请房源',val:1},
    {name:'待审核实勘房源',val:2},
    {name:'待确认钥匙房源',val:3},
  ];
  //朝向
  cxJSON = [
    {name:'全部',val:0},
    {name:'东',val:1},
    {name:'南',val:2},
    {name:'西',val:3},
    {name:'北',val:4},
    {name:'南北',val:5},
    {name:'双南',val:6},
    {name:'东西',val:7},
    {name:'东南',val:8},
    {name:'西南',val:9},
    {name:'东北',val:10},
    {name:'西北',val:11},
  ];

}
