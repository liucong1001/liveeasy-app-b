import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
@NgModule({
  declarations: [
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
    LockhousePage

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
    LockhousePage
    
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ComponentsModule,
        CommonModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        LoginProvider,
        LocalStorageProvider,
        HomeProvider,
        HttpProvider,
        Camera,
    ]
})
export class AppModule {}
