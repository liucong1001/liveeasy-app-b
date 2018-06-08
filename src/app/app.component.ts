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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = StartupPage;
  // rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private appUpdate: VersionProvider,
              private androidPermissions: AndroidPermissions,
              private device: Device,
              private headerColor: HeaderColor,
              public app: App,
              private nativePageTransitions: NativePageTransitions) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // let status bar overlay webview
      statusBar.overlaysWebView(false);
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
}
