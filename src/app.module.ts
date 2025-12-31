import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ServicesIndexModule } from './services';
import { PostgresConfigService } from './configs/postgres.config';
import { JwtConfigService } from './configs/jwt.config';
import { AuthGuard } from './utils/guards/auth.guard';
import { SystemIndexModule } from './systems';

@Module({
  imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
		JwtModule.registerAsync({ useClass: JwtConfigService }),
    ServicesIndexModule,
    SystemIndexModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
  ],
})
export class AppModule {}
