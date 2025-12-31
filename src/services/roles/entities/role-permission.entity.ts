import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';

import { RoleEntity } from './role.entity';
import { PermissionEntity } from '../../permissions/entities/permission.entity';

@Entity({ name: 'roles_permissions' })
export class RolePermissionEntity {
	@PrimaryColumn({ name: 'role_id', type: 'int' })
	roleId: number;

	@PrimaryColumn({ name: 'permission_id', type: 'int' })
	permissionId: number;

	/** ****************************************************************** **/
	/**                             Relations                              **/
	/** ****************************************************************** **/

	@ManyToOne(
		() => RoleEntity,
		(role) => role.rolePermissions,
		{ onDelete: 'CASCADE' }
	)
	@JoinColumn({ name: 'role_id' })
	role: RoleEntity;

	@ManyToOne(
		() => PermissionEntity,
		(permission) => permission.rolePermissions,
		{ onDelete: 'CASCADE' }
	)
	@JoinColumn({ name: 'permission_id' })
	permission: PermissionEntity;
}
