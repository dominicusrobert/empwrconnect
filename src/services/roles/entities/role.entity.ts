import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';

import { UserEntity } from '../../../services/users/entities/user.entity';
import { PermissionEntity } from '../../../services/permissions/entities/permission.entity';


@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity {
	/** ****************************************************************** **/
	/**                              Columns                               **/
	/** ****************************************************************** **/

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'name', type: 'varchar', unique: true })
	name: string;

	/** ****************************************************************** **/
	/**                             Relations                              **/
	/** ****************************************************************** **/

	@ManyToMany(() => UserEntity, (user) => user.roles)
	users: UserEntity[];

	@ManyToMany(() => PermissionEntity, (permission) => permission.roles)
	@JoinTable({
		name: 'role_has_permissions',
		joinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'permission_id',
			referencedColumnName: 'id',
		},
	})
	permissions: PermissionEntity[];
}
