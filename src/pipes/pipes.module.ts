import { NgModule } from '@angular/core';
import { StringJsonPipe } from './string-json/string-json';
import { ToParseIntPipe } from './to-parse-int/to-parse-int';
@NgModule({
	declarations: [StringJsonPipe,
    ToParseIntPipe],
	imports: [],
	exports: [StringJsonPipe,
    ToParseIntPipe]
})
export class PipesModule {}
