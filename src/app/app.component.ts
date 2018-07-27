import { Component,ViewChild  } from '@angular/core';
import {App, Platform, Nav, ToastController, IonicApp, Keyboard as KB} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import {AccountPage} from "../pages/account/account";
import {VersionProvider} from "../providers/version/app.version";
import {Device} from "@ionic-native/device";
import {HeaderColor} from "@ionic-native/header-color";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {AccountPage} from "../pages/account/account";

import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {TabsPage} from "../pages/tabs/tabs";

import { Keyboard } from '@ionic-native/keyboard';
import {AndroidPermissions} from "@ionic-native/android-permissions";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  // rootPage:any = TabsPage; AccountPage
  tagsList:any;
  selected:any;
  //app退出设置
  @ViewChild('navRoot') nav: Nav;
  toast: any = ToastController;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private appUpdate: VersionProvider,public localStorageProvider: LocalStorageProvider,
              private device: Device,
              private headerColor: HeaderColor,
              public app: App,
              public keybord: Keyboard,
              public kb: KB,
              private nativePageTransitions: NativePageTransitions,public ionicApp: IonicApp,public toastCtrl: ToastController,
              private androidPermissions: AndroidPermissions
              ) {
      if(!this.localStorageProvider.get('ticket')){
          this.rootPage = AccountPage;
      }
    //标签
    this.tagsList=this.localStorageProvider.get('tagsList');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();//头部信号字体颜色
      // let status bar overlay webview 头部信号
      statusBar.overlaysWebView(true);
      // set status bar to white
      //statusBar.backgroundColorByHexString('#ffffff');
      headerColor.tint('#1ab394');
      splashScreen.hide();
      this.setKeyBorder();
      //android 6 以上动态获取权限
      if (this.device.platform == "Android") {
        this.androidPermissions.requestPermissions([
          this.androidPermissions.PERMISSION.CAMERA,
          this.androidPermissions.PERMISSION.GET_ACCOUNTS,
          this.androidPermissions.PERMISSION.REQUEST_INSTALLPACKAGES,
          this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ]);
      }
      //检测版本更新
      // 返回按键事件
      this.registerBackButtonAction();
    });
  }

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

  setKeyBorder() {
    this.keybord.hideKeyboardAccessoryBar(false);
    if (this.device.platform === 'iOS') {
      this.keybord.disableScroll(true);
    }
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      if (this.kb.isOpen()) {
        this.kb.close();
        return;
      }
      //点击返回按钮隐藏toast或loading或Overlay
      this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive();
      if (this.ionicApp._modalPortal) {
        let activePortal = this.ionicApp._modalPortal.getActive();
        if (activePortal) {
          activePortal.dismiss().catch(() => {});
          activePortal.onDidDismiss(() => {});
          return;
        }
      }


      let activeVC = this.nav.getActive();


      let tabs = activeVC.instance.tabs;
      let activeNav = tabs && tabs.getSelected();

      if (activeNav) {
        if (activeNav === AccountPage) {
          return this.showExit();
        }
        if (activeNav.canGoBack()) {
          this.nativePageTransitions.cancelPendingTransition();
          let options: NativeTransitionOptions = {
            direction: 'right',
            duration: 400,
            slowdownfactor: 3,
            iosdelay: 50
          };

          this.nativePageTransitions.slide(options)
            .then()
            .catch()
          activeNav.pop({animate:false, duration: 0});
        } else {
          this.showExit()

        }
      }


      return activeNav;

    }, 1);
  }


//双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'middle'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }



}
