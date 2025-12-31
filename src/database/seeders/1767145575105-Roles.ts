import { MigrationInterface, QueryRunner } from "typeorm";

export class Roles1767145575105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "roles"
            ADD CONSTRAINT "UQ_roles_name" UNIQUE ("name");
        `);

        await queryRunner.query(`
            INSERT INTO "roles" ("name", "created_at", "updated_at")
            VALUES
                ('ADMIN', now(), now()),
                ('STAFF', now(), now()),
                ('CLIENT', now(), now())
            ON CONFLICT ("name") DO NOTHING;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "roles"
            WHERE "name" IN ('ADMIN','STAFF','CLIENT');
        `);

        await queryRunner.query(`
            ALTER TABLE "roles" DROP CONSTRAINT IF EXISTS "UQ_roles_name";
        `);
    }

}
