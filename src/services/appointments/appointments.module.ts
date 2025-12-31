import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { AppointmentEntity } from './entities/appointment.entity';
import { StaffScheduleEntity } from './entities/staff-schedule.entity';
import { ShiftEntity } from './entities/shift.entity';
import { DataSourceModule } from '../../systems/data-source/data-source.module';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity, StaffScheduleEntity, ShiftEntity]), DataSourceModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService]
})
export class AppointmentsModule {}
