import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousingPage } from './housing';
import {PipesModule} from "../../pipes/pipes.module";
import { LazyLoadImageModule } from 'ng2-lazyload-image';
@NgModule({
  declarations: [
    HousingPage,
  ],
  imports: [
    PipesModule,LazyLoadImageModule,
    IonicPageModule.forChild(HousingPage),
  ],
})
export class HousingPageModule {}
