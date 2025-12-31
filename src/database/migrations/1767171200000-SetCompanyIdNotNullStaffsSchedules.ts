import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetCompanyIdNotNullStaffsSchedules1767171200000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// best-effort backfill: use first company id if any row is null
		await queryRunner.query(`
			UPDATE "staffs_schedules"
			SET company_id = (
				SELECT id FROM companies ORDER BY id LIMIT 1
			)
			WHERE company_id IS NULL
		`);

		await queryRunner.query(`ALTER TABLE "staffs_schedules" ALTER COLUMN "company_id" SET NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "staffs_schedules" ALTER COLUMN "company_id" DROP NOT NULL`);
	}
}
