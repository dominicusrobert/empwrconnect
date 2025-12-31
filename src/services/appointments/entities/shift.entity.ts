import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../../base/base.entity';

@Entity({ name: 'shifts' })
export class ShiftEntity extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@Index()
	@Column({
		name: 'day',
		type: 'smallint',
		comment: 'Day of week (1-7)'
	})
	day: number;

	@Column({
		name: 'start_time',
		type: 'time'
	})
	startTime: string;

	@Column({
		name: 'end_time',
		type: 'time'
	})
	endTime: string;
}
