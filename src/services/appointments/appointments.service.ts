import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppointmentEntity } from './entities/appointment.entity';
import { BookAppointmentRequest } from './dto/book-appointment.request';

@Injectable()
export class AppointmentsService {
	constructor(
		@InjectRepository(AppointmentEntity)
		private readonly repository: Repository<AppointmentEntity>,
	) {}

	async book(request: BookAppointmentRequest): Promise<AppointmentEntity> {
		const toSave = this.repository.create({
			companyStaffScheduleId: request.companyStaffScheduleId,
			clientId: request.clientId,
			staffId: request.staffId,
			locationId: request.locationId,
			status: request.status,
		});

		return this.repository.save(toSave);
	}
}
