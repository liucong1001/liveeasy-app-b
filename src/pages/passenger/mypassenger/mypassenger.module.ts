import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MypassengerPage } from './mypassenger';
import {PipesModule} from "../../../pipes/pipes.module";
import {PassengerfollowPageModule} from "./passengerfollow/passengerfollow.module";
import {PassengerlookPageModule} from "./passengerlook/passengerlook.module";
import {AccomplishPageModule} from "./accomplish/accomplish.module";
import {CloseprivateguestPageModule} from "./closeprivateguest/closeprivateguest.module";
import {SearchPageModule} from "./search/search.module";

@NgModule({
  declarations: [
    MypassengerPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(MypassengerPage),
    PassengerfollowPageModule,
    PassengerlookPageModule,
    AccomplishPageModule,
    CloseprivateguestPageModule,
    SearchPageModule
  ],
})
export class MypassengerPageModule {}
