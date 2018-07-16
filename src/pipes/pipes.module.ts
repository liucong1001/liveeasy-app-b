import { NgModule } from '@angular/core';
import { StringJsonPipe } from './string-json/string-json';
import { ToParseIntPipe } from './to-parse-int/to-parse-int';
import { AreaPipe } from './area/area';
import { TradingAreaPipe } from './trading-area/trading-area';
import { CodeValuePipe } from './code-value/code-value';
@NgModule({
	declarations: [StringJsonPipe,
    ToParseIntPipe,
    AreaPipe,
    TradingAreaPipe,
    CodeValuePipe],
	imports: [],
	exports: [StringJsonPipe,
    ToParseIntPipe,
    AreaPipe,
    TradingAreaPipe,
    CodeValuePipe]
})
export class PipesModule {}
