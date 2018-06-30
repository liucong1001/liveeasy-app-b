import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddlookPage } from './addlook';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    AddlookPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AddlookPage),
  ],
})
export class AddlookPageModule {}
