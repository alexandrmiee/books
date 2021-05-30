import {MigrationInterface, QueryRunner} from "typeorm";

export class Books1622379991754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "books" (
                "id" UUID NOT NULL DEFAULT UUID_generate_v4(),
                "logo" CHARACTER VARYING (255),
                "title" CHARACTER VARYING (255),
                "shortDescription" CHARACTER VARYING (255),
                "fullDescription" TEXT,
                "year" CHARACTER VARYING (4),
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "book"`);
}

}
