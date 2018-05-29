import { NgModule } from '@angular/core';
import { StringJsonPipe } from './string-json/string-json';
import { ToParseIntPipe } from './to-parse-int/to-parse-int';
import { AreaPipe } from './area/area';
import { TradingAreaPipe } from './trading-area/trading-area';
@NgModule({
	declarations: [StringJsonPipe,
    ToParseIntPipe,
    AreaPipe,
    TradingAreaPipe],
	imports: [],
	exports: [StringJsonPipe,
    ToParseIntPipe,
    AreaPipe,
    TradingAreaPipe]
})
export class PipesModule {}
