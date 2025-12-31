import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../../base/base.entity';
import { UserRoleCompanyEntity } from '../../users/entities/user-role-company.entity';

@Entity({ name: 'companies' })
export class CompanyEntity extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@Column({ name: 'name', type: 'varchar', length: 100 })
	name: string;

    /** ****************************************************************** **/
    /**                             Relations                              **/
    /** ****************************************************************** **/

	@OneToMany(
		() => UserRoleCompanyEntity,
		(urc) => urc.company
	)
	userRolesCompanies: UserRoleCompanyEntity[];
}
