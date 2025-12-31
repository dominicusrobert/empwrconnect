import { Expose, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsDateString } from 'class-validator';

import { AppointmentStatuEnum } from '../enums/appointment-status.enum';

export class BookAppointmentRequest {
	@IsNumber()
	@Type(() => Number)
	@Expose({ name: 'company_staff_schedule_id' })
	companyStaffScheduleId: number;

	@IsNumber()
	@Type(() => Number)
	@Expose({ name: 'client_id' })
	clientId: number;

	@IsDateString()
	@Expose({ name: 'starts_at' })
	startsAt: string;

	@IsDateString()
	@Expose({ name: 'ends_at' })
	endsAt: string;

	@IsNumber()
	@Type(() => Number)
	@Expose({ name: 'location_id' })
	locationId: number;

	@IsEnum(AppointmentStatuEnum)
	@Type(() => Number)
	status: AppointmentStatuEnum = AppointmentStatuEnum.PENDING;
}
