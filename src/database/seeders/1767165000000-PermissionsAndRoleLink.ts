import { MigrationInterface, QueryRunner } from 'typeorm';

import { PermissionEnum } from '../../services/permissions/enums/permission.enum';

export class PermissionsAndRoleLink1767165000000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const permissions = Object.values(PermissionEnum);

		await queryRunner.query(`
			INSERT INTO "permissions" ("name")
			SELECT p.name
			FROM (values ${permissions.map((p) => `('${p}')`).join(',')}) as p(name)
			WHERE NOT EXISTS (
				SELECT 1 FROM "permissions" perm WHERE perm.name = p.name
			);
		`);

		// Notes: hardcode role id 1 (admin)
		await queryRunner.query(`
			INSERT INTO "roles_permissions" ("role_id", "permission_id")
			SELECT 1, p.id
			FROM "permissions" p
			WHERE p.name IN (${permissions.map((p) => `'${p}'`).join(',')})
			  AND NOT EXISTS (
				SELECT 1 FROM "roles_permissions" rp
				WHERE rp.role_id = 1 AND rp.permission_id = p.id
			);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const permissions = Object.values(PermissionEnum);

		await queryRunner.query(
			`
				DELETE FROM "roles_permissions"
				WHERE role_id = 1
				AND permission_id IN (
					SELECT id FROM "permissions" WHERE name IN (${permissions.map((p) => `'${p}'`).join(',')})
				);
			`,
		);

		await queryRunner.query(
			`
				DELETE FROM "permissions"
				WHERE name IN (${permissions.map((p) => `'${p}'`).join(',')});
			`,
		);
	}
}
