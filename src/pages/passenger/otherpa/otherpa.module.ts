import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtherpaPage } from './otherpa';
import {ComponentsModule} from "../../../components/components.module";
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    OtherpaPage,
  ],
  imports: [
    IonicPageModule.forChild(OtherpaPage),
    ComponentsModule,PipesModule
  ],
})
export class OtherpaPageModule {}
