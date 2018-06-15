import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddpassengerPage } from './addpassenger';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    AddpassengerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddpassengerPage),
    ComponentsModule
  ],
})
export class AddpassengerPageModule {}
