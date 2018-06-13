import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeyPage } from './key';
import {ComponentsModule} from '../../../../components/components.module';
import {DirectivesModule} from "../../../../directives/directives.module";
@NgModule({
  declarations: [
    KeyPage,
  ],
  imports: [
    IonicPageModule.forChild(KeyPage),
    ComponentsModule,DirectivesModule
  ],
})
export class KeyPageModule {}
