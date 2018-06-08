import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousedetailPage } from './housedetail';
import {ComponentsModule} from '../../components/components.module';


@NgModule({
  declarations: [
    HousedetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HousedetailPage),
    ComponentsModule,
  ],
})
export class HousedetailPageModule {}
