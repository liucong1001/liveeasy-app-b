import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components/components';
import { ValidErrorComponent } from './valid-error/valid-error';
import { UploadComponent } from './upload/upload';

@NgModule({
	declarations: [
	ComponentsComponent,
    ValidErrorComponent,
    UploadComponent,],
	imports: [CommonModule],
	exports: [ComponentsComponent,
    ValidErrorComponent,
    UploadComponent,]
})
export class ComponentsModule {}
