import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { RoleEntity } from "../../../services/roles/entities/role.entity";
import { BaseEntity } from "../../../base/base.entity";


@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {

    constructor(name: string, email: string, password: string, status: string) {
        super();

        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /** ****************************************************************** **/
    /**                              Columns                               **/
    /** ****************************************************************** **/

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

	@ManyToMany(() => RoleEntity, (role) => role.users)
	@JoinTable({
		name: 'users_roles',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
	})
	roles: RoleEntity[];
}