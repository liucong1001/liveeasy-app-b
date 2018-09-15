import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginProvider } from '../providers/login/login';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { HomeProvider } from '../providers/home/home';

import { CommonModule } from '@angular/common';
import {ComponentsModule} from "../components/components.module";
import { HttpProvider } from '../providers/http/http';
import { Camera } from '@ionic-native/camera';
import { VersionProvider } from '../providers/version/app.version';
import {VersionUpdateProvider} from "../providers/version/app.update";
import {FileOpener} from "@ionic-native/file-opener";
import {FileTransfer} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {Device} from "@ionic-native/device";
import {HTTP} from "@ionic-native/http";
import {AppVersion} from "@ionic-native/app-version";
import {HeaderColor} from "@ionic-native/header-color";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import { AddhouseProvider } from '../providers/addhouse/addhouse';

import {UpdatepwdProvider} from "../providers/updatepwd/updatepwd";
import { PropertyProvider } from '../providers/property/property';

import { FileProvider } from '../providers/file/file';
import {FollowProvider} from "../providers/follow/follow";
import {ClosehouseProvider} from "../providers/closehouse/closehouse";
import {RecordProvider} from "../providers/record/record";
import {ConfigProvider} from "../providers/config/config";
import { CustomerProvider } from '../providers/customer/customer';

import { PublicCustomerProvider } from '../providers/public-customer/public-customer';

import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

import {ToastComponent} from "../components/toast/toast";
import { PhotoViewer } from '@ionic-native/photo-viewer';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { Network } from '@ionic-native/network';
import { ENV } from '@app/env';
//启动加速

import { StartupPageModule } from './../pages/startup/startup.module';

import { PassengerPageModule } from './../pages/passenger/passenger.module';

import { LoginPageModule } from './../pages/login/login.module';

import { HousingPageModule } from './../pages/housing/housing.module';

import { CenterPageModule } from './../pages/center/center.module';

import { AllsearchPageModule } from './../pages/allsearch/allsearch.module';

import {HomePageModule} from "../pages/home/home.module";
import {BackButtonProvider} from "../providers/common/backButton";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Keyboard } from '@ionic-native/keyboard';
import { PermissionProvider } from '../providers/permission/permission';
import {BaiduMapModule } from "angular2-baidu-map";
import {AndroidPermissions} from "@ionic-native/android-permissions";
import { JPush } from '@jiguang-ionic/jpush';
import { NativeProvider } from '../providers/native/native';
import { CodePush } from '@ionic-native/code-push';
import { Diagnostic } from '@ionic-native/diagnostic';
import {jpushUnit} from "../providers/native/jpush-unit";
import { SharePropertyProvider } from '../providers/property/share-property';
import { Clipboard } from '@ionic-native/clipboard';
@NgModule({
  declarations: [
    MyApp,
    TabsPage,
  ],
  entryComponents: [
    MyApp,
   TabsPage,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ComponentsModule,
        CommonModule,
      HomePageModule,
        //页面模块，
      LoginPageModule,StartupPageModule,PassengerPageModule,
      LoginPageModule,HousingPageModule,CenterPageModule,AllsearchPageModule,
      IonicModule.forRoot(MyApp,{
        tabsHideOnSubPages: 'true',         //ionic3隐藏全部子页面tabs
        preloadModules: true,
        mode: 'ios',          //把所有平台设置为iOS风格：
        modalEnter: 'modal-slide-in',
        modalLeave: 'modal-slide-out',
        pageTransition: 'md-transition'
        // swipeBackEnabled: true
      }),
      ionicGalleryModal.GalleryModalModule,
      BrowserAnimationsModule,
      BaiduMapModule.forRoot({ak:'8azVgQbZR9irKHBOsqMzi8CAT7l1gtjt'}),
    ],
    bootstrap: [IonicApp],
    providers: [
      StatusBar,
      SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      { provide: 'ENV', useValue: ENV },
      LoginProvider,
      LocalStorageProvider,
      HomeProvider,
      AddhouseProvider,
      HttpProvider,
      Camera,
      UpdatepwdProvider,
      VersionUpdateProvider,
      VersionProvider,
      FileOpener,
      FileTransfer,
      Device,
      File,
      HTTP,
      AppVersion,
      HeaderColor,
      NativePageTransitions,
      PropertyProvider,
      FileProvider,
      // FollowProvider,
      ClosehouseProvider,
      RecordProvider,
      FollowProvider,
      ConfigProvider,
    CustomerProvider,
    PublicCustomerProvider,
       ImagePicker,
       Base64,
      ToastComponent,
      PhotoViewer,
      BackButtonProvider,
      Keyboard,
      {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: ionicGalleryModal.GalleryModalHammerConfig,
      },
      PermissionProvider,
      AndroidPermissions,
      JPush,Network,
      NativeProvider,CodePush,Diagnostic,jpushUnit,
      SharePropertyProvider,Clipboard
    ]
})
export class AppModule {}
