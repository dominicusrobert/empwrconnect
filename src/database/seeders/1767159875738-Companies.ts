import { MigrationInterface, QueryRunner } from "typeorm";

export class Companies1767159875738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "companies" ("name")
            VALUES
                ('Aruma Services'),
                ('Endeavour Foundation'),
                ('Life Without Barriers'),
                ('Scope (Aust) Ltd'),
                ('Northcott (The Northcott Society)'),
                ('Cerebral Palsy Alliance'),
                ('The Benevolent Society'),
                ('Australian Unity Care Services Pty Ltd'),
                ('Unitingcare Community'),
                ('Ability Options Ltd');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "companies"
            WHERE "name" IN (
                'Aruma Services',
                'Endeavour Foundation',
                'Life Without Barriers',
                'Scope (Aust) Ltd',
                'Northcott (The Northcott Society)',
                'Cerebral Palsy Alliance',
                'The Benevolent Society',
                'Australian Unity Care Services Pty Ltd',
                'Unitingcare Community',
                'Ability Options Ltd'
            );
        `);
    }

}
