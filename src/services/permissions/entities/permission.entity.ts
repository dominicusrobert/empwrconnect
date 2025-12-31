import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { RolePermissionEntity } from '../../roles/entities/role-permission.entity';
import { BaseEntity } from '../../../base/base.entity';


@Entity({ name: 'permissions' })
export class PermissionEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'name' })
	name: string;

	/** ****************************************************************** **/
	/**                             Relations                              **/
	/** ****************************************************************** **/

	@OneToMany(() => RolePermissionEntity, (rp) => rp.permission)
	rolePermissions: RolePermissionEntity[];
}
