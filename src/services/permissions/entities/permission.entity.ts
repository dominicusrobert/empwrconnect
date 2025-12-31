import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { RoleEntity } from '../../../services/roles/entities/role.entity';


@Entity({ name: 'permissions' })
export class PermissionEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'name' })
	name: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	/** ****************************************************************** **/
	/**                             Relations                              **/
	/** ****************************************************************** **/

	@ManyToMany(() => RoleEntity, (role) => role.permissions)
	@JoinTable({
		name: 'role_has_permissions',
		joinColumn: {
			name: 'permission_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
	})
	roles: RoleEntity[];
}
