import { Component,ViewChild  } from '@angular/core';
import {App, Platform, Nav, ToastController, IonicApp, Keyboard as KB, } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {VersionProvider} from "../providers/version/app.version";
import {Device} from "@ionic-native/device";
import {HeaderColor} from "@ionic-native/header-color";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {TabsPage} from "../pages/tabs/tabs";

import { Keyboard } from '@ionic-native/keyboard';
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {LoginPage} from "../pages/login/login";
import { JPush } from '@jiguang-ionic/jpush';
import {AppVersion} from "@ionic-native/app-version";
import {HTTP} from "@ionic-native/http";
import {NativeProvider} from "../providers/native/native";
import {Network} from "@ionic-native/network";
import {jpushUnit} from "../providers/native/jpush-unit";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  // rootPage:any = TabsPage; AccountPage
  tagsList:any;
  selected:any;
  //app退出设置
  @ViewChild('navRoot') nav: Nav;
  toast: any = ToastController;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  //app 更新
  private versionJsonUrl : any;
  versionNumber :string;
  versionInfo:any;
  aLinKDownload:string;
  aLinKDownloadVersion:string;
  // 全局变量
  toastCheckNetwork:any;
  constructor(
    public platform: Platform, splashScreen: SplashScreen,public statusBar: StatusBar,
              private appUpdate: VersionProvider,public localStorageProvider: LocalStorageProvider,
              private device: Device,
              private headerColor: HeaderColor,
              public app: App,
              public keybord: Keyboard,
              public kb: KB,
              private nativePageTransitions: NativePageTransitions,public ionicApp: IonicApp,public toastCtrl: ToastController,
              private androidPermissions: AndroidPermissions,public jpush: JPush,private appVersion: AppVersion,private http: HTTP,
              private  nativeProvider:NativeProvider,private network: Network,private jpushUnit:jpushUnit,

  ) {

    if(this.localStorageProvider.get('ticket')){
      this.rootPage = TabsPage;
    }
   if(this.platform.is('cordova')){
     this.statusBar.styleDefault();
     this.statusBar.overlaysWebView(true);
     this.headerColor.tint('#1ab394');

     platform.ready().then(() => {
       this.listenConnection();// 检测网络
       // Okay, so the platform is ready and our plugins are available.
       // Here you can do any higher level native things you might need.
       statusBar.styleDefault();//头部信号字体颜色
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
       this.appUpdate.checkVersion(false);
       // 返回按键事件
       this.registerBackButtonAction();
       /*极光推送开启 **/
       jpush.init();
       jpush.setDebugMode(true);
       //检查热更新
       this.nativeProvider.sync();
       console.log('手机定位开始');
       //手机定位
       // this.nativeProvider.getLocation();
     });
   }

  }

  go(item){
    this.selected = item;
  }

  setKeyBorder() {
    this.keybord.hideKeyboardAccessoryBar(false);
    if (this.device.platform === 'iOS') {
      this.keybord.disableScroll(true);
    }
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      if(!this.localStorageProvider.get('ticket')){
        this.showExit();
        return;
      }
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
          // activeNav.popToRoot({animate:false, duration: 0});

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

  // 检测网络
  private listenConnection(): void {

    this.network.onConnect().subscribe(()=>{
      console.log('已连接到网络');
      this.toastCheckNetwork&&this.toastCheckNetwork.dismiss();
    });

    this.network.onDisconnect()
      .subscribe(() => {
        console.log('网络丢失！');
        this.toastCheckNetwork ? this.toastCheckNetwork.dismiss() : false;
        this.toastCheckNetwork= this.toastCtrl.create({
           message: '未检测到网络,请连接网络',
           showCloseButton: true,
           closeButtonText: '确定',
        });
        this.toastCheckNetwork.present();
      });

  }


}
