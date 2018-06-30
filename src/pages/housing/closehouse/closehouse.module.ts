import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClosehousePage } from './closehouse';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    ClosehousePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ClosehousePage),
  ],
})
export class ClosehousePageModule {}
