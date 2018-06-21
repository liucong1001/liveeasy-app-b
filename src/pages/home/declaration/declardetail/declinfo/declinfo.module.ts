import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeclinfoPage } from './declinfo';

@NgModule({
  declarations: [
    DeclinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DeclinfoPage),
  ],
})
export class DeclinfoPageModule {}
