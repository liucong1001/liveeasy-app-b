import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddhousePage } from './addhouse';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AddhousePage,
  ],
  imports: [
    IonicPageModule.forChild(AddhousePage),
      ComponentsModule,
  ],
})
export class AddhousePageModule {}
