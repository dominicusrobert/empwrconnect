import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ServicesIndexModule } from './services';
import { PostgresConfigService } from './configs/postgres.config';
import { JwtConfigService } from './configs/jwt.config';
import { DataSourceModule } from './data-source/data-source.module';
import { RolesModule } from './services/roles/roles.module';
import { PermissionsModule } from './services/permissions/permissions.module';

@Module({
  imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
		JwtModule.registerAsync({ useClass: JwtConfigService }),
    ServicesIndexModule,
    DataSourceModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
