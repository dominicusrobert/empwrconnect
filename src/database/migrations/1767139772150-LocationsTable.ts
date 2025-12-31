import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class LocationsTable1767139772150 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis`);
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'australia_state') THEN
                CREATE TYPE australia_state AS ENUM ('NSW','VIC','QLD','WA','SA','TAS','ACT','NT');
                END IF;
            END
            $$;
        `);

        await queryRunner.createTable(
            new Table({
                name: "locations",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "type",
                        type: "varchar",
                        length: "50",
                        isNullable: false
                    },
                    {
                        name: "state",
                        type: "australia_state",
                        isNullable: false
                    },
                    {
                        name: "city",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "location",
                        type: "geography",
                        isNullable: true,
                        spatialFeatureType: "Point",
                        srid: 4326,
                    },
                    {
                        name: "notes",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamptz",
                        isNullable: false,
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamptz",
                        isNullable: false,
                        default: "now()"
                    },
                    {
                        name: "deleted_at",
                        type: "timestamptz",
                        isNullable: true
                    },
                ],
            }),
            true
        );

        await queryRunner.query(
            `CREATE INDEX "IDX_locations_location_gist" ON "locations" USING GIST ("location")`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_locations_location_gist"`);
        await queryRunner.dropTable("locations");

        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'australia_state') THEN
                DROP TYPE australia_state;
                END IF;
            END
            $$;
        `);

    }

}
