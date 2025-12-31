import { Body, Controller, Post } from '@nestjs/common';

import { StaffSchedulesService } from './staff-schedules.service';
import { CreateStaffScheduleRequest } from './dto/create-staff-schedule.request';

import { Permissions } from '../../utils/decorators/permission.decorator';
import { PermissionEnum } from '../permissions/enums/permission.enum';
import { BaseResponse } from '../../base/base.response';

@Controller('staff-schedules')
export class StaffSchedulesController {
	constructor(private readonly staffSchedulesService: StaffSchedulesService) {}

	@Post('create')
	@Permissions(PermissionEnum.CREATE_STAFF_SCHEDULES)
	async create(@Body() request: CreateStaffScheduleRequest) {
		const result = await this.staffSchedulesService.create(request);
		return BaseResponse.successResponse(result, 'Create Staff Schedule Success');
	}
}
