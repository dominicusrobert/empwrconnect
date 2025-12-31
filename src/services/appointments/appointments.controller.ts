import { Body, Controller, Headers, Post, Request, BadRequestException } from '@nestjs/common';

import { AppointmentsService } from './appointments.service';
import { BookAppointmentRequest } from './dto/book-appointment.request';
import { PermissionEnum } from '../permissions/enums/permission.enum';

import { Permissions } from '../../utils/decorators/permission.decorator';
import { BaseResponse } from '../../base/base.response';

@Controller('appointments')
export class AppointmentsController {

	constructor(private readonly appointmentsService: AppointmentsService) {}

	@Post('book')
	@Permissions(PermissionEnum.CREATE_APPOINTMENTS)
	async book(
		@Request() request,
		@Body() bodyRequest: BookAppointmentRequest,
		@Headers('idempotency-key') idempotencyKey?: string,
	) {
		if (!idempotencyKey) {
			throw new BadRequestException('Idempotency-Key header is required');
		}

		const result = await this.appointmentsService.book(request.userDetail, bodyRequest, idempotencyKey);
		return BaseResponse.successResponse(result, 'Book Appointment Success');
	}
}
