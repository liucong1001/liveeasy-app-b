import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerfollowPage } from './passengerfollow';
import {ComponentsModule} from "../../../../components/components.module";

@NgModule({
  declarations: [
    PassengerfollowPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PassengerfollowPage),
  ],
})
export class PassengerfollowPageModule {}
