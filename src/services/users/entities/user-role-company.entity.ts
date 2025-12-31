import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';

import { BaseEntity } from '../../../base/base.entity';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../../roles/entities/role.entity';
import { CompanyEntity } from '../../companies/entities/company.entity';

@Entity({ name: 'users_roles_companies' })
@Unique(['userId', 'roleId', 'companyId'])
export class UserRoleCompanyEntity extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@Column({ name: 'user_id', type: 'bigint' })
	userId: number;

	@Column({ name: 'role_id', type: 'int' })
	roleId: number;

	@Column({ name: 'company_id', type: 'bigint' })
	companyId: number;

	/** ****************************************************************** **/
	/**                             Relations                              **/
	/** ****************************************************************** **/

	@ManyToOne(
		() => UserEntity,
		(user) => user.userRolesCompanies,
		{ onDelete: 'CASCADE' }
	)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@ManyToOne(
		() => RoleEntity,
		(role) => role.userRolesCompanies,
		{ onDelete: 'CASCADE' }
	)
	@JoinColumn({ name: 'role_id' })
	role: RoleEntity;

	@ManyToOne(
		() => CompanyEntity,
		(company) => company.userRolesCompanies,
		{ onDelete: 'CASCADE' }
	)
	@JoinColumn({ name: 'company_id' })
	company: CompanyEntity;
}
