import { MigrationInterface, QueryRunner } from 'typeorm';

import { PermissionEnum } from '../../services/permissions/enums/permission.enum';

export class PermissionsAndRoleLink1767165000000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const permissions = [
			PermissionEnum.VIEW_APPOINTMENTS,
			PermissionEnum.CREATE_APPOINTMENTS,
			PermissionEnum.EDIT_APPOINTMENTS,
			PermissionEnum.DELETE_APPOINTMENTS,
		];

		await queryRunner.query(`
			INSERT INTO "permissions" ("name")
			SELECT p.name
			FROM (values ${permissions.map((p) => `('${p}')`).join(',')}) as p(name)
			WHERE NOT EXISTS (
				SELECT 1 FROM "permissions" perm WHERE perm.name = p.name
			);
		`);

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const permissions = [
			PermissionEnum.VIEW_APPOINTMENTS,
			PermissionEnum.CREATE_APPOINTMENTS,
			PermissionEnum.EDIT_APPOINTMENTS,
			PermissionEnum.DELETE_APPOINTMENTS,
		];

		await queryRunner.query(
			`
				DELETE FROM "permissions"
				WHERE name IN (${permissions.map((p) => `'${p}'`).join(',')});
			`,
		);
	}
}
