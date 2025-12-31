import { Expose, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateStaffScheduleRequest {
	@IsNumber()
	@Type(() => Number)
	@Expose({ name: 'staff_id' })
	staffId: number;

	@IsNumber()
	@Type(() => Number)
	@Expose({ name: 'shift_id' })
	shiftId: number;
}
