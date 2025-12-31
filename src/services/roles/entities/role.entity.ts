import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';

import { UserRoleCompanyEntity } from '../../users/entities/user-role-company.entity';
import { RolePermissionEntity } from './role-permission.entity';


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

	@OneToMany(
		() => UserRoleCompanyEntity,
		(urc) => urc.role
	)
	userRolesCompanies: UserRoleCompanyEntity[];

	@OneToMany(
		() => RolePermissionEntity,
		(rp) => rp.role
	)
	rolePermissions: RolePermissionEntity[];
}
