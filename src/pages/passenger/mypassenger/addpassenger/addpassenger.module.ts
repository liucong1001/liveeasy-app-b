import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddpassengerPage } from './addpassenger';
import {ComponentsModule} from "../../../../components/components.module";
import {PipesModule} from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    AddpassengerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddpassengerPage),
    ComponentsModule,PipesModule
  ],
})
export class AddpassengerPageModule {}
