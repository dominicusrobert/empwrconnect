import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../../base/base.entity';
import { StaffScheduleEntity } from './staff-schedule.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'appointments' })
export class AppointmentEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'idempotency_key', type: 'varchar', length: 100, unique: true })
	idempotencyKey: string;

	@Column({ name: 'company_staff_schedule_id', type: 'bigint' })
	companyStaffScheduleId: number;

	@Column({ name: 'client_id', type: 'bigint' })
	clientId: number;

	@Column({ name: 'starts_at', type: 'timestamptz' })
	startsAt: Date;

	@Column({ name: 'ends_at', type: 'timestamptz' })
	endsAt: Date;

	@Column({
		name: 'time_range',
		type: 'tstzrange',
		asExpression: "tstzrange(starts_at, ends_at, '[)')",
		generatedType: 'STORED',
	})
	timeRange: string;

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

}
