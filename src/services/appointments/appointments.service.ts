import { Injectable, ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppointmentEntity } from './entities/appointment.entity';
import { BookAppointmentRequest } from './dto/book-appointment.request';
import { DataSourceService } from '../../systems/data-source/data-source.service';
import { TokenUserDetail } from '../../utils/dto/token-user-detail.dto';
import { StaffScheduleEntity } from './entities/staff-schedule.entity';
import { UserRoleCompanyEntity } from '../users/entities/user-role-company.entity';

@Injectable()
export class AppointmentsService {
	constructor(
		@InjectRepository(AppointmentEntity)
		private readonly repository: Repository<AppointmentEntity>,

		private readonly dataSource: DataSourceService,
	) {}

	async book(
		userDetail: TokenUserDetail,
		request: BookAppointmentRequest,
		idempotencyKey: string,
	): Promise<any> {
		let appointment: AppointmentEntity | null = null;

		await this.dataSource.transaction(userDetail, async (manager) => {
			const existing = await manager.findOne(AppointmentEntity, { where: { idempotencyKey } });
			if (existing) {
				throw new ConflictException('Appointment already created');
			}

			// tenant check
			const schedule = await manager.findOne(StaffScheduleEntity, {
				where: { id: request.companyStaffScheduleId },
			});
			if (!schedule) {
				throw new NotFoundException('Staff schedule not found');
			}
			if (schedule.companyId != userDetail.companyId) {
				throw new ForbiddenException('Staff schedule is not in your company');
			}

			const clientCompany = await manager.findOne(UserRoleCompanyEntity, {
				where: { userId: request.clientId, companyId: userDetail.companyId },
			});
			if (!clientCompany) {
				throw new ForbiddenException('Client is not in your company');
			}


			// availability check
			const startsAt = new Date(request.startsAt);
			const endsAt = new Date(request.endsAt);

			const overlap = await manager
				.createQueryBuilder(AppointmentEntity, 'a')
				.setLock('pessimistic_read')
				.where('a.companyStaffScheduleId = :scheduleId', { scheduleId: request.companyStaffScheduleId })
				.andWhere('a.deletedAt IS NULL')
				.andWhere('a.timeRange && tstzrange(:start, :end, \'[)\')', {
					start: startsAt.toISOString(),
					end: endsAt.toISOString(),
				})
				.getRawOne();

			if (overlap) {
				throw new ConflictException('Staff is not available for the requested time range');
			}

			appointment = await manager.save(
				AppointmentEntity,
				{
					idempotencyKey,
					companyStaffScheduleId: request.companyStaffScheduleId,
					clientId: request.clientId,
					startsAt,
					endsAt,
					locationId: request.locationId,
					status: request.status,
				},
			);
		});

		return { isSuccess: true, appointment };
	}
}
