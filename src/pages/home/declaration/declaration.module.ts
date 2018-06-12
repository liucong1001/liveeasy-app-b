import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeclarationPage } from './declaration';

@NgModule({
  declarations: [
    DeclarationPage,
  ],
  imports: [
    IonicPageModule.forChild(DeclarationPage),
  ],
})
export class DeclarationPageModule {}
