import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LookhousePage } from './lookhouse';

@NgModule({
  declarations: [
    LookhousePage,
  ],
  imports: [
    IonicPageModule.forChild(LookhousePage),
  ],
})
export class LookhousePageModule {}
