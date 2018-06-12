import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {StartupPage} from '../pages/startup/startup'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MsgdetailPage } from '../pages/home/msgdetail/msgdetail';
import { TabsPage } from '../pages/tabs/tabs';
import { PassengerPage } from '../pages/passenger/passenger';
import { CenterPage } from '../pages/center/center';
import { HousingPage } from '../pages/housing/housing';
import { FollowPage } from '../pages/housing/follow/follow';
import { ClosehousePage } from '../pages/housing/closehouse/closehouse';
import { AddlookPage } from '../pages/housing/addlook/addlook';
import { LoginProvider } from '../providers/login/login';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { HomeProvider } from '../providers/home/home';

 import { MdetailsPage } from '../pages/home/mdetails/mdetails';
import { HousedetailPage } from '../pages/housing/housedetail/housedetail';
import { AddhousePage } from '../pages/housing/addhouse/addhouse';



import { CommonModule } from '@angular/common';
import {ComponentsModule} from "../components/components.module";
import { HttpProvider } from '../providers/http/http';
import { Camera } from '@ionic-native/camera';

import { RolepeoplePage } from '../pages/housing/housedetail/rolepeople/rolepeople';
import { RecordPage } from '../pages/housing/housedetail/record/record';
import { MypassengerPage } from '../pages/passenger/mypassenger/mypassenger';
import { PublicpassengerPage } from '../pages/passenger/publicpassenger/publicpassenger';
import { AddpassengerPage } from '../pages/passenger/addpassenger/addpassenger';
import { PassengerdetailPage } from '../pages/passenger/passengerdetail/passengerdetail';
import { PassengerfollowPage } from '../pages/passenger/mypassenger/passengerfollow/passengerfollow';
import { PfollowrecordPage } from '../pages/passenger/publicpassenger/publicpdetail/pfollowrecord/pfollowrecord';
import { PassengerlookPage } from '../pages/passenger/mypassenger/passengerlook/passengerlook';
import { PlookrecordPage } from '../pages/passenger/publicpassenger/publicpdetail/plookrecord/plookrecord';
import { AccomplishPage } from '../pages/passenger/mypassenger/accomplish/accomplish';
import { CloseprivateguestPage } from '../pages/passenger/closeprivateguest/closeprivateguest';
import { PublicpdetailPage } from '../pages/passenger/publicpassenger/publicpdetail/publicpdetail';
import { AddpublicguestPage } from '../pages/passenger/publicpassenger/publicpdetail/addpublicguest/addpublicguest';
import { DeclarationPage } from '../pages/home/declaration/declaration';
import { DeclardetailPage } from '../pages/home/declardetail/declardetail';
import { ChoosehousePage } from '../pages/passenger/publicpassenger/choosehouse/choosehouse';
import { UpdatepwdPage } from '../pages/center/updatepwd/updatepwd';
import { HelpPage } from '../pages/center/help/help';
import { AboutusPage } from '../pages/center/aboutus/aboutus';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { VerifyphonePage } from '../pages/center/verifyphone/verifyphone'
import { VersionProvider } from '../providers/version/app.version';
import {VersionUpdateProvider} from "../providers/version/app.update";
import {FileOpener} from "@ionic-native/file-opener";
import {FileTransfer} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {Device} from "@ionic-native/device";
import {HTTP} from "@ionic-native/http";
import {AppVersion} from "@ionic-native/app-version";
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {HeaderColor} from "@ionic-native/header-color";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import { AddhouseProvider } from '../providers/addhouse/addhouse';
import {SearchhousePage} from '../pages/housing/housedetail/searchhouse/searchhouse';
import {UpdatepwdProvider} from "../providers/updatepwd/updatepwd";
import { PropertyProvider } from '../providers/property/property';
import {StringJsonPipe} from "../pipes/string-json/string-json";
import { LookhousePage } from '../pages/housing/housedetail/lookhouse/lookhouse';
import { LetteratorneyPage } from '../pages/housing/housedetail/letteratorney/letteratorney';
import {ToParseIntPipe} from "../pipes/to-parse-int/to-parse-int";
import { FileProvider } from '../providers/file/file';
import {FollowProvider} from "../providers/follow/follow";
import {ClosehouseProvider} from "../providers/closehouse/closehouse";
import {RecordProvider} from "../providers/record/record";
import {ConfigProvider} from "../providers/config/config";
import { CustomerProvider } from '../providers/customer/customer';
import {AreaPipe} from "../pipes/area/area";
import {KeyPage} from "../pages/housing/housedetail/key/key";
import { PublicCustomerProvider } from '../providers/public-customer/public-customer';
import {DescPage} from "../pages/housing/housedetail/desc/desc";
import {BelongerPage} from "../pages/housing/closehouse/belonger/belonger";
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import {AllsearchPage} from "../pages/allsearch/allsearch";
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import {ToastComponent} from "../components/toast/toast";
import { PhotoViewer } from '@ionic-native/photo-viewer';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
//启动加速
import {AboutusPageModule} from '../pages/center/aboutus/aboutus.module';
import {AccomplishPageModule} from '../pages/passenger/mypassenger/accomplish/accomplish.module';
import {AccountPageModule} from '../pages/account/account.module';
import {AddhousePageModule}from '../pages/housing/addhouse/addhouse.module';
import {AddlookPageModule}from '../pages/housing/addlook/addlook.module';
import {AddpassengerPageModule} from '../pages/passenger/addpassenger/addpassenger.module';
import { VerifyphonePageModule } from '../pages/center/verifyphone/verifyphone.module';
import { UpdatepwdPageModule } from '../pages/center/updatepwd/updatepwd.module';
import { StartupPageModule } from './../pages/startup/startup.module';
import { SearchhousePageModule } from '../pages/housing/housedetail/searchhouse/searchhouse.module';
import { RolepeoplePageModule } from '../pages/housing/housedetail/rolepeople/rolepeople.module';
import { RecordPageModule } from '../pages/housing/housedetail/record/record.module';
import { PublicpdetailPageModule } from '../pages/passenger/publicpassenger/publicpdetail/publicpdetail.module';
import { PublicpassengerPageModule } from '../pages/passenger/publicpassenger/publicpassenger.module';
import { PfollowrecordPageModule } from '../pages/passenger/publicpassenger/publicpdetail/pfollowrecord/pfollowrecord.module';
import { PassengerlookPageModule } from '../pages/passenger/mypassenger/passengerlook/passengerlook.module';
import { PassengerfollowPageModule } from '../pages/passenger/mypassenger/passengerfollow/passengerfollow.module';
import { PassengerPageModule } from './../pages/passenger/passenger.module';
import { MypassengerPageModule } from '../pages/passenger/mypassenger/mypassenger.module';
import { MyaccountPageModule } from './../pages/myaccount/myaccount.module';
import { MsgdetailPageModule } from '../pages/home/msgdetail/msgdetail.module';
import { MdetailsPageModule } from '../pages/home/mdetails/mdetails.module';
import { LoginPageModule } from './../pages/login/login.module';
import { LetteratorneyPageModule } from '../pages/housing/housedetail/letteratorney/letteratorney.module';
import { KeyPageModule } from '../pages/housing/housedetail/key/key.module';
import { HousingPageModule } from './../pages/housing/housing.module';
import { HousedetailPageModule } from '../pages/housing/housedetail/housedetail.module';
import { HelpPageModule } from '../pages/center/help/help.module';
import { FollowPageModule } from '../pages/housing/follow/follow.module';
import { DescPageModule } from '../pages/housing/housedetail/desc/desc.module';
import { DeclardetailPageModule } from '../pages/home/declardetail/declardetail.module';
import { DeclarationPageModule } from '../pages/home/declaration/declaration.module';
import { CloseprivateguestPageModule } from '../pages/passenger/closeprivateguest/closeprivateguest.module';
import { ClosehousePageModule } from '../pages/housing/closehouse/closehouse.module';
import { ChoosehousePageModule } from '../pages/passenger/publicpassenger/choosehouse/choosehouse.module';
import { CenterPageModule } from './../pages/center/center.module';
import { BelongerPageModule } from '../pages/housing/closehouse/belonger/belonger.module';
import { AllsearchPageModule } from './../pages/allsearch/allsearch.module';
import { AddpublicguestPageModule } from '../pages/passenger/publicpassenger/publicpdetail/addpublicguest/addpublicguest.module';
import {PassengerdetailPageModule} from '../pages/passenger/passengerdetail/passengerdetail.module'
import  {PlookrecordPageModule} from '../pages/passenger/publicpassenger/publicpdetail/plookrecord/plookrecord.module';
import {LookhousePageModule}from '../pages/housing/housedetail/lookhouse/lookhouse.module';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
  ],
  entryComponents: [
    MyApp,
    HomePage,
    StartupPage,
    AccountPage,
    LoginPage,
    MsgdetailPage,
    TabsPage,
    PassengerPage,
    CenterPage,
    HousingPage,
    FollowPage,
    ClosehousePage,
    AddlookPage,
    MdetailsPage,
    HousedetailPage,
    AddhousePage,
      RolepeoplePage,
      RecordPage,
      AddpassengerPage,
      MypassengerPage,
      PublicpassengerPage,
      PassengerdetailPage,
      PassengerfollowPage,
      PfollowrecordPage,
      PassengerlookPage,
      PlookrecordPage,
      AccomplishPage,
      CloseprivateguestPage,
      PublicpdetailPage,
      AddpublicguestPage,
      DeclarationPage,
      DeclardetailPage,
      ChoosehousePage,
      AboutusPage,
      HelpPage,
      UpdatepwdPage,
      MyaccountPage,
      VerifyphonePage,
    SearchhousePage,
    LookhousePage,
    LetteratorneyPage,
    KeyPage,
    DescPage,
    BelongerPage,
    AllsearchPage
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ComponentsModule,
        CommonModule,
        LazyLoadImageModule,
        //页面模块，
       AboutusPageModule,
      AccomplishPageModule,AccountPageModule,AddhousePageModule,AddlookPageModule,AddpassengerPageModule,
      VerifyphonePageModule,UpdatepwdPageModule,StartupPageModule,SearchhousePageModule,RolepeoplePageModule,
      RecordPageModule,PublicpdetailPageModule,PublicpassengerPageModule,PfollowrecordPageModule,
      PassengerlookPageModule,PassengerfollowPageModule,PassengerPageModule,MypassengerPageModule,MyaccountPageModule,
      MsgdetailPageModule,MdetailsPageModule,LoginPageModule,LetteratorneyPageModule,KeyPageModule,
      HousingPageModule,HousedetailPageModule,HelpPageModule,FollowPageModule,DescPageModule,DeclardetailPageModule,DeclarationPageModule,
      CloseprivateguestPageModule,ClosehousePageModule,ClosehousePageModule,ChoosehousePageModule,CenterPageModule,
      BelongerPageModule,AllsearchPageModule,AddpublicguestPageModule,PassengerdetailPageModule,PlookrecordPageModule,
      LookhousePageModule,
        // IonicModule.forRoot(MyApp)
      IonicModule.forRoot(MyApp,{
        tabsHideOnSubPages: 'true',         //ionic3隐藏全部子页面tabs
        mode: 'ios',          //把所有平台设置为iOS风格：
        // swipeBackEnabled: true
      }),
      ionicGalleryModal.GalleryModalModule,
    ],
    bootstrap: [IonicApp],
    providers: [
      StatusBar,
      SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
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
      AndroidPermissions,
      AppVersion,
      HeaderColor,
      FingerprintAIO,
      NativePageTransitions,
      PropertyProvider,
      FileProvider,
      FollowProvider,
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
      {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: ionicGalleryModal.GalleryModalHammerConfig,
      },
    ]
})
export class AppModule {}
