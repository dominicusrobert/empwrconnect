import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class AuditTrailTable1767140786588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "audit_trail",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "type",
                        type: "varchar",
                        length: "80",
                        isNullable: false,
                    },
                    {
                        name: "before",
                        type: "jsonb",
                        isNullable: true
                    },
                    {
                        name: "after",
                        type: "jsonb",
                        isNullable: true
                    },
                    {
                        name: "reason",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamptz",
                        isNullable: false,
                        default: "now()"
                    },
                ],
            }),
            true
        );

        await queryRunner.createIndex(
            "audit_trail",
            new TableIndex({
                name: "IDX_audit_trail_user_id",
                columnNames: ["user_id"],
            })
        );

        await queryRunner.createIndex(
            "audit_trail",
            new TableIndex({
                name: "IDX_audit_trail_type",
                columnNames: ["type"],
            })
        );

        await queryRunner.createIndex(
            "audit_trail",
            new TableIndex({
                name: "IDX_audit_trail_created_at",
                columnNames: ["created_at"],
            })
        );

        await queryRunner.createForeignKey(
            "audit_trail",
            new TableForeignKey({
                name: "FK_audit_trail_user",
                columnNames: ["user_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("audit_trail");
    }

}
