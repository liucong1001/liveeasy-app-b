import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LookhousePage } from './lookhouse';
import {ComponentsModule} from '../../../../components/components.module'
import {DirectivesModule} from "../../../../directives/directives.module";

@NgModule({
  declarations: [
    LookhousePage,
  ],
  imports: [
    IonicPageModule.forChild(LookhousePage),
    ComponentsModule,
    DirectivesModule,
  ],
})
export class LookhousePageModule {}
