import { MigrationInterface, QueryRunner } from 'typeorm';

import { PermissionEnum } from '../../services/permissions/enums/permission.enum';

export class RolePermissionsAdmin1767169000000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const permissions = [
			PermissionEnum.VIEW_STAFF_SCHEDULES,
			PermissionEnum.CREATE_STAFF_SCHEDULES,
			PermissionEnum.EDIT_STAFF_SCHEDULES,
			PermissionEnum.DELETE_STAFF_SCHEDULES,
		];

		await queryRunner.query(`
			INSERT INTO "permissions" ("name")
			SELECT p.name
			FROM (values ${permissions.map((p) => `('${p}')`).join(',')}) as p(name)
			WHERE NOT EXISTS (
				SELECT 1 FROM "permissions" perm WHERE perm.name = p.name
			);
		`);

		// link to roles 1 and 2
		await queryRunner.query(`
			INSERT INTO "roles_permissions" ("role_id", "permission_id")
			SELECT roles.role_id, p.id
			FROM "permissions" p
			CROSS JOIN (values (1), (2)) as roles(role_id)
			WHERE p.name IN (${permissions.map((p) => `'${p}'`).join(',')})
			  AND NOT EXISTS (
				SELECT 1 FROM "roles_permissions" rp WHERE rp.role_id = roles.role_id AND rp.permission_id = p.id
			  );
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const permissions = [
			PermissionEnum.VIEW_STAFF_SCHEDULES,
			PermissionEnum.CREATE_STAFF_SCHEDULES,
			PermissionEnum.EDIT_STAFF_SCHEDULES,
			PermissionEnum.DELETE_STAFF_SCHEDULES,
		];
		await queryRunner.query(`
			DELETE FROM "roles_permissions"
			WHERE role_id IN (1, 2)
			  AND permission_id IN (
				SELECT id FROM "permissions" WHERE name IN (${permissions.map((p) => `'${p}'`).join(',')})
			  );
		`);
	}
}
