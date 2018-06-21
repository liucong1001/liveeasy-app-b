import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MypassengerPage } from './mypassenger';
import {PipesModule} from "../../../pipes/pipes.module";
import {PassengerfollowPageModule} from "./passengerfollow/passengerfollow.module";
import {PassengerlookPageModule} from "./passengerlook/passengerlook.module";
import {CloseprivateguestPageModule} from "./closeprivateguest/closeprivateguest.module";
import {SearchPageModule} from "./passengerlook/search/search.module";
import {AddpassengerPageModule} from "./addpassenger/addpassenger.module";
import {PassengerdetailPageModule} from "./passengerdetail/passengerdetail.module";

@NgModule({
  declarations: [
    MypassengerPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(MypassengerPage),
    AddpassengerPageModule,
    CloseprivateguestPageModule,
    PassengerfollowPageModule,
    PassengerlookPageModule,
    PassengerdetailPageModule
  ],
})
export class MypassengerPageModule {}
