import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LetteratorneyPage } from './letteratorney';
import {ComponentsModule} from '../../../../components/components.module';
import {DirectivesModule} from "../../../../directives/directives.module";
@NgModule({
  declarations: [
    LetteratorneyPage,
  ],
  imports: [
    IonicPageModule.forChild(LetteratorneyPage),
    ComponentsModule,DirectivesModule
  ],
})
export class LetteratorneyPageModule {}
