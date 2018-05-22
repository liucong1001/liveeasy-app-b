import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchhousePage } from './searchhouse';

@NgModule({
  declarations: [
    SearchhousePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchhousePage),
  ],
})
export class SearchhousePageModule {}
