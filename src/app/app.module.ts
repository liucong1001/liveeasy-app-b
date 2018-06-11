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
import { MsgdetailPage } from '../pages/msgdetail/msgdetail';
import { TabsPage } from '../pages/tabs/tabs';
import { PassengerPage } from '../pages/passenger/passenger';
import { CenterPage } from '../pages/center/center';
import { HousingPage } from '../pages/housing/housing';
import { FollowPage } from '../pages/follow/follow';
import { ClosehousePage } from '../pages/closehouse/closehouse';
import { AddlookPage } from '../pages/addlook/addlook';
import { LoginProvider } from '../providers/login/login';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { HomeProvider } from '../providers/home/home';

 import { MdetailsPage } from '../pages/mdetails/mdetails';
import { HousedetailPage } from '../pages/housedetail/housedetail';
import { RedacthousePage } from '../pages/redacthouse/redacthouse';
import { AddhousePage } from '../pages/addhouse/addhouse';
import { LockhousePage } from '../pages/lockhouse/lockhouse';



import { CommonModule } from '@angular/common';
import {ComponentsModule} from "../components/components.module";
import { HttpProvider } from '../providers/http/http';
import { Camera } from '@ionic-native/camera';

import { RolepeoplePage } from '../pages/rolepeople/rolepeople';
import { RecordPage } from '../pages/record/record';
import { MypassengerPage } from '../pages/mypassenger/mypassenger';
import { PublicpassengerPage } from '../pages/publicpassenger/publicpassenger';
import { AddpassengerPage } from '../pages/addpassenger/addpassenger';
import { PassengerdetailPage } from '../pages/passengerdetail/passengerdetail';
import { PassengerfollowPage } from '../pages/passengerfollow/passengerfollow';
import { PfollowrecordPage } from '../pages/pfollowrecord/pfollowrecord';
import { PassengerlookPage } from '../pages/passengerlook/passengerlook';
import { PlookrecordPage } from '../pages/plookrecord/plookrecord';
import { AccomplishPage } from '../pages/accomplish/accomplish';
import { CloseprivateguestPage } from '../pages/closeprivateguest/closeprivateguest';
import { PublicpdetailPage } from '../pages/publicpdetail/publicpdetail';
import { AddpublicguestPage } from '../pages/addpublicguest/addpublicguest';
import { DeclarationPage } from '../pages/declaration/declaration';
import { DeclardetailPage } from '../pages/declardetail/declardetail';
import { ChoosehousePage } from '../pages/choosehouse/choosehouse';
import { UpdatepwdPage } from '../pages/updatepwd/updatepwd';
import { HelpPage } from '../pages/help/help';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { VerifyphonePage } from '../pages/verifyphone/verifyphone'
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
import {SearchhousePage} from '../pages/searchhouse/searchhouse';
import {UpdatepwdProvider} from "../providers/updatepwd/updatepwd";
import { PropertyProvider } from '../providers/property/property';
import {StringJsonPipe} from "../pipes/string-json/string-json";
import { LookhousePage } from './../pages/lookhouse/lookhouse';
import { LetteratorneyPage } from '../pages/letteratorney/letteratorney';
import {ToParseIntPipe} from "../pipes/to-parse-int/to-parse-int";
import { FileProvider } from '../providers/file/file';
import {FollowProvider} from "../providers/follow/follow";
import {ClosehouseProvider} from "../providers/closehouse/closehouse";
import {RecordProvider} from "../providers/record/record";
import {ConfigProvider} from "../providers/config/config";
import { CustomerProvider } from '../providers/customer/customer';
import {AreaPipe} from "../pipes/area/area";
import {KeyPage} from "../pages/key/key";
import { PublicCustomerProvider } from '../providers/public-customer/public-customer';
import {DescPage} from "../pages/desc/desc";
import {BelongerPage} from "../pages/belonger/belonger";
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import {AllsearchPage} from "../pages/allsearch/allsearch";
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import {ToastComponent} from "../components/toast/toast"
//启动加速
import {AboutusPageModule} from '../pages/aboutus/aboutus.module';
import {AccomplishPageModule} from '../pages/accomplish/accomplish.module';
import {AccountPageModule} from '../pages/account/account.module';
import {AddhousePageModule}from '../pages/addhouse/addhouse.module';
import {AddlookPageModule}from'../pages/addlook/addlook.module';
import {AddpassengerPageModule} from '../pages/addpassenger/addpassenger.module';
import { VerifyphonePageModule } from './../pages/verifyphone/verifyphone.module';
import { UpdatepwdPageModule } from './../pages/updatepwd/updatepwd.module';
import { StartupPageModule } from './../pages/startup/startup.module';
import { SearchhousePageModule } from './../pages/searchhouse/searchhouse.module';
import { RolepeoplePageModule } from './../pages/rolepeople/rolepeople.module';
import { RedacthousePageModule } from './../pages/redacthouse/redacthouse.module';
import { RecordPageModule } from './../pages/record/record.module';
import { PublicpdetailPageModule } from './../pages/publicpdetail/publicpdetail.module';
import { PublicpassengerPageModule } from './../pages/publicpassenger/publicpassenger.module';
import { PfollowrecordPageModule } from './../pages/pfollowrecord/pfollowrecord.module';
import { PassengerlookPageModule } from './../pages/passengerlook/passengerlook.module';
import { PassengerfollowPageModule } from './../pages/passengerfollow/passengerfollow.module';
import { PassengerPageModule } from './../pages/passenger/passenger.module';
import { MypassengerPageModule } from './../pages/mypassenger/mypassenger.module';
import { MyaccountPageModule } from './../pages/myaccount/myaccount.module';
import { MsgdetailPageModule } from './../pages/msgdetail/msgdetail.module';
import { MdetailsPageModule } from './../pages/mdetails/mdetails.module';
import { LoginPageModule } from './../pages/login/login.module';
import { LockhousePageModule } from './../pages/lockhouse/lockhouse.module';
import { LetteratorneyPageModule } from './../pages/letteratorney/letteratorney.module';
import { KeyPageModule } from './../pages/key/key.module';
import { HousingPageModule } from './../pages/housing/housing.module';
import { HousedetailPageModule } from './../pages/housedetail/housedetail.module';
import { HelpPageModule } from './../pages/help/help.module';
import { FollowPageModule } from './../pages/follow/follow.module';
import { DescPageModule } from './../pages/desc/desc.module';
import { DeclardetailPageModule } from './../pages/declardetail/declardetail.module';
import { DeclarationPageModule } from './../pages/declaration/declaration.module';
import { CloseprivateguestPageModule } from './../pages/closeprivateguest/closeprivateguest.module';
import { ClosehousePageModule } from './../pages/closehouse/closehouse.module';
import { ChoosehousePageModule } from './../pages/choosehouse/choosehouse.module';
import { CenterPageModule } from './../pages/center/center.module';
import { BelongerPageModule } from './../pages/belonger/belonger.module';
import { AllsearchPageModule } from './../pages/allsearch/allsearch.module';
import { AddpublicguestPageModule } from './../pages/addpublicguest/addpublicguest.module';
import {PassengerdetailPageModule} from './../pages/passengerdetail/passengerdetail.module'
import  {PlookrecordPageModule} from './../pages/plookrecord/plookrecord.module';
import {LookhousePageModule}from'./../pages/lookhouse/lookhouse.module';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // StartupPage,
    // AccountPage,
    // LoginPage,
    // MsgdetailPage,
    TabsPage,
    // PassengerPage,
    // CenterPage,
    // HousingPage,
    // FollowPage,
    // ClosehousePage,
    // AddlookPage,
    // MdetailsPage,
    // HousedetailPage,
    // RedacthousePage,
    // AddhousePage,
    // LockhousePage,
    //   RolepeoplePage,
    //   RecordPage,
    //   AddpassengerPage,
    //   MypassengerPage,
    //   PublicpassengerPage,
    //   PassengerdetailPage,
    //   PassengerfollowPage,
    //   PfollowrecordPage,
    //   PassengerlookPage,
    //   PlookrecordPage,
    //   AccomplishPage,
    //   CloseprivateguestPage,
    //   PublicpdetailPage,
    //   AddpublicguestPage,
    //   DeclarationPage,
    //   DeclardetailPage,
    //   ChoosehousePage,
    //   // AboutusPage,
    //   HelpPage,
    //   UpdatepwdPage,
    //   MyaccountPage,
    //   VerifyphonePage,
    //   SearchhousePage,
    //   StringJsonPipe,
    //   LookhousePage,
    //   LetteratorneyPage,
    //   StringJsonPipe,
    //   ToParseIntPipe,
    //    AreaPipe,
    // KeyPage,
    // DescPage,
    // BelongerPage,
    // AllsearchPage,
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
    RedacthousePage,
    AddhousePage,
    LockhousePage,
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
      RedacthousePageModule,RecordPageModule,PublicpdetailPageModule,PublicpassengerPageModule,PfollowrecordPageModule,
      PassengerlookPageModule,PassengerfollowPageModule,PassengerPageModule,MypassengerPageModule,MyaccountPageModule,
      MsgdetailPageModule,MdetailsPageModule,LoginPageModule,LockhousePageModule,LetteratorneyPageModule,KeyPageModule,
      HousingPageModule,HousedetailPageModule,HelpPageModule,FollowPageModule,DescPageModule,DeclardetailPageModule,DeclarationPageModule,
      CloseprivateguestPageModule,ClosehousePageModule,ClosehousePageModule,ChoosehousePageModule,CenterPageModule,
      BelongerPageModule,AllsearchPageModule,AddpublicguestPageModule,PassengerdetailPageModule,PlookrecordPageModule,
      LookhousePageModule,
        // IonicModule.forRoot(MyApp)
      IonicModule.forRoot(MyApp,{
        tabsHideOnSubPages: 'true',         //ionic3隐藏全部子页面tabs
        mode: 'ios',          //把所有平台设置为iOS风格：
        // swipeBackEnabled: true
      })
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
    ]
})
export class AppModule {}
