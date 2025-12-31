import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../../base/base.entity';
import { ShiftEntity } from './shift.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { AppointmentEntity } from './appointment.entity';

@Entity({ name: 'staffs_schedules' })
export class StaffScheduleEntity extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@Column({ name: 'company_id', type: 'bigint' })
	companyId: number;

	@Column({ name: 'staff_id', type: 'bigint' })
	staffId: number;

	@Column({ name: 'shift_id', type: 'int' })
	shiftId: number;

    /** ****************************************************************** **/
    /**                             Relations                              **/
    /** ****************************************************************** **/

	@ManyToOne(
		() => UserEntity,
		{ onDelete: 'RESTRICT' }
	)
	@JoinColumn({ name: 'staff_id' })
	staff: UserEntity;

	@ManyToOne(
		() => ShiftEntity,
		{ onDelete: 'RESTRICT' }
	)
	@JoinColumn({ name: 'shift_id' })
	shift: ShiftEntity;

	@OneToMany(
		() => AppointmentEntity,
		(appointment) => appointment.staffSchedule
	)
	appointments: AppointmentEntity[];
}
