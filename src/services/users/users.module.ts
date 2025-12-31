import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { DataSourceModule } from '../../systems/data-source/data-source.module';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule, DataSourceModule],
  controllers: [UsersController],
	providers: [UsersService, UserRepository],
})
export class UsersModule {}
