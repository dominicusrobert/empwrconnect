import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffSchedulesController } from './staff-schedules.controller';
import { StaffSchedulesService } from './staff-schedules.service';
import { StaffScheduleEntity } from '../appointments/entities/staff-schedule.entity';
import { ShiftEntity } from '../appointments/entities/shift.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffScheduleEntity, ShiftEntity])],
  controllers: [StaffSchedulesController],
  providers: [StaffSchedulesService],
})
export class StaffSchedulesModule {}
