import { Body, Controller, Post } from '@nestjs/common';

import { AppointmentsService } from './appointments.service';
import { BookAppointmentRequest } from './dto/book-appointment.request';
import { PermissionEnum } from '../permissions/enums/permission.enum';

import { Permissions } from '../../utils/decorators/permission.decorator';

@Controller('appointments')
export class AppointmentsController {

	constructor(private readonly appointmentsService: AppointmentsService) {}

	@Post()
	@Permissions(PermissionEnum.CREATE_APPOINTMENTS)
	async book(@Body() request: BookAppointmentRequest) {
		return this.appointmentsService.book(request);
	}
}
