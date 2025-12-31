import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "../../../base/base.entity";
import { UserRoleCompanyEntity } from "./user-role-company.entity";


@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar' })
    name: string;

    @Column({ name: 'phone', type: 'varchar' })
    phone: string;

    @Column({ name: 'email', type: 'varchar' })
    email: string;
    
    @Column({ name: 'password', type: 'varchar' })
    password: string;

    /** ****************************************************************** **/
    /**                             Relations                              **/
    /** ****************************************************************** **/

	@OneToMany(() => UserRoleCompanyEntity, (urc) => urc.user)
	userRolesCompanies: UserRoleCompanyEntity[];
}
