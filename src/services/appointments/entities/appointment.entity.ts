import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../../base/base.entity';
import { StaffScheduleEntity } from './staff-schedule.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'appointments' })
export class AppointmentEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'company_staff_schedule_id', type: 'bigint' })
	companyStaffScheduleId: number;

	@Column({ name: 'client_id', type: 'bigint' })
	clientId: number;

	@Column({ name: 'staff_id', type: 'bigint' })
	staffId: number;

	@Column({ name: 'location_id', type: 'int', nullable: true })
	locationId: number | null;

	@Column({ name: 'status', type: 'smallint', default: 0 })
	status: number;

	@ManyToOne(() => StaffScheduleEntity, (schedule) => schedule.appointments, { onDelete: 'RESTRICT' })
	@JoinColumn({ name: 'company_staff_schedule_id' })
	staffSchedule: StaffScheduleEntity;

	@ManyToOne(() => UserEntity, { onDelete: 'RESTRICT' })
	@JoinColumn({ name: 'client_id' })
	client: UserEntity;

	@ManyToOne(() => UserEntity, { onDelete: 'RESTRICT' })
	@JoinColumn({ name: 'staff_id' })
	staff: UserEntity;
}
