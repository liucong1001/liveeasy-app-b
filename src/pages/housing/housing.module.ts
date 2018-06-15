import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { HousingPage } from './housing';
import {PipesModule} from "../../pipes/pipes.module";
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import {AddhousePageModule} from "./addhouse/addhouse.module";
import {AddlookPageModule} from "./addlook/addlook.module";
import {ClosehousePageModule} from "./closehouse/closehouse.module";
import {FollowPageModule} from "./follow/follow.module";
import {HousedetailPageModule} from "./housedetail/housedetail.module";
import {MyApp} from "../../app/app.component";
@NgModule({
  declarations: [
    HousingPage,
  ],
  imports: [
    PipesModule,LazyLoadImageModule,
    IonicPageModule.forChild(HousingPage),
    AddhousePageModule,
    AddlookPageModule,
    ClosehousePageModule,
    FollowPageModule,
    HousedetailPageModule,
  ],
})
export class HousingPageModule {}
