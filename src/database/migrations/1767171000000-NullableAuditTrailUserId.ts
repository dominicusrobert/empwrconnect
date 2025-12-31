import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableAuditTrailUserId1767171000000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "audit_trail" ALTER COLUMN "user_id" DROP NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "audit_trail" ALTER COLUMN "user_id" SET NOT NULL`);
	}
}
