import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AccountPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AccountPage),
  ],
})
export class AccountPageModule {}
