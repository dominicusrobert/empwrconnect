import { MigrationInterface, QueryRunner } from 'typeorm';

export class Shifts1767168000000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO "shifts" ("day", "start_time", "end_time")
			VALUES
				(1, '08:00', '12:00'),
				(1, '13:00', '17:00'),
				(2, '08:00', '12:00'),
				(2, '13:00', '17:00'),
				(3, '08:00', '12:00'),
				(3, '13:00', '17:00'),
				(4, '08:00', '12:00'),
				(4, '13:00', '17:00'),
				(5, '08:00', '12:00'),
				(5, '13:00', '17:00')
			ON CONFLICT DO NOTHING;
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			DELETE FROM "shifts"
			WHERE (day, start_time, end_time) IN (
				(1, '08:00', '12:00'),
				(1, '13:00', '17:00'),
				(2, '08:00', '12:00'),
				(2, '13:00', '17:00'),
				(3, '08:00', '12:00'),
				(3, '13:00', '17:00'),
				(4, '08:00', '12:00'),
				(4, '13:00', '17:00'),
				(5, '08:00', '12:00'),
				(5, '13:00', '17:00')
			);
		`);
	}
}
