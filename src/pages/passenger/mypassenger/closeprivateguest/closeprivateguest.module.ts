import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CloseprivateguestPage } from './closeprivateguest';
import {ComponentsModule} from "../../../../components/components.module";

@NgModule({
  declarations: [
    CloseprivateguestPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CloseprivateguestPage),
  ],
})
export class CloseprivateguestPageModule {}
