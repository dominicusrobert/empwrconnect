import { Module } from '@nestjs/common';

import { DataSourceModule } from './data-source/data-source.module';

@Module({
	imports: [DataSourceModule],
	exports: [DataSourceModule],
})
export class SystemIndexModule {}
