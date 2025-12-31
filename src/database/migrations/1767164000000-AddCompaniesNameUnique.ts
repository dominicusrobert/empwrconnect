import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompaniesNameUnique1767164000000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE "companies" DROP CONSTRAINT IF EXISTS "UQ_companies_name";',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE "companies" ADD CONSTRAINT "UQ_companies_name" UNIQUE ("name");',
		);
	}
}
