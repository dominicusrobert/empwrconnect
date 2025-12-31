import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StaffScheduleEntity } from '../appointments/entities/staff-schedule.entity';
import { ShiftEntity } from '../appointments/entities/shift.entity';
import { CreateStaffScheduleRequest } from './dto/create-staff-schedule.request';

@Injectable()
export class StaffSchedulesService {
	constructor(
		@InjectRepository(StaffScheduleEntity)
		private readonly staffScheduleRepo: Repository<StaffScheduleEntity>,
		@InjectRepository(ShiftEntity)
		private readonly shiftRepo: Repository<ShiftEntity>,
	) {}

	async create(request: CreateStaffScheduleRequest): Promise<StaffScheduleEntity> {
		const shift = await this.shiftRepo.findOne({ where: { id: request.shiftId } });
		if (!shift) {
			throw new NotFoundException('Shift not found');
		}

		const toSave = this.staffScheduleRepo.create({
			staffId: request.staffId,
			shiftId: request.shiftId,
		});

		return this.staffScheduleRepo.save(toSave);
	}
}
