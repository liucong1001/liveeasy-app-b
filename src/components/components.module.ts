import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components/components';
import { ValidErrorComponent } from './valid-error/valid-error';
@NgModule({
	declarations: [
	ComponentsComponent,
    ValidErrorComponent],
	imports: [CommonModule],
	exports: [ComponentsComponent,
    ValidErrorComponent]
})
export class ComponentsModule {}
