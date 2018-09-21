import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoldPage } from './sold';

@NgModule({
  declarations: [
    SoldPage,
  ],
  imports: [
    IonicPageModule.forChild(SoldPage),
  ],
})
export class SoldPageModule {}
