import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowPage } from './follow';
import {ComponentsModule} from '../../../components/components.module';
@NgModule({
  declarations: [
    FollowPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(FollowPage),
  ],
})
export class FollowPageModule {}
