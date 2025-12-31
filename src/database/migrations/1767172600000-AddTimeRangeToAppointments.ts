import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimeRangeToAppointments1767172600000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS btree_gist`);

		await queryRunner.query(`ALTER TABLE "appointments" ADD COLUMN "starts_at" timestamptz NOT NULL`);
		await queryRunner.query(`ALTER TABLE "appointments" ADD COLUMN "ends_at" timestamptz NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "appointments" ADD COLUMN "time_range" tstzrange GENERATED ALWAYS AS (tstzrange(starts_at, ends_at, '[)')) STORED`,
		);
		await queryRunner.query(
			`ALTER TABLE "appointments" ADD CONSTRAINT "CHK_appointments_time_order" CHECK (ends_at > starts_at)`,
		);
		await queryRunner.query(
			`ALTER TABLE "appointments" ADD CONSTRAINT "EXC_appointments_no_overlap" EXCLUDE USING gist (company_staff_schedule_id WITH =, time_range WITH &&) WHERE (deleted_at IS NULL)`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT IF EXISTS "EXC_appointments_no_overlap"`);
		await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT IF EXISTS "CHK_appointments_time_order"`);
		await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN IF EXISTS "time_range"`);
		await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN IF EXISTS "ends_at"`);
		await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN IF EXISTS "starts_at"`);
	}
}
