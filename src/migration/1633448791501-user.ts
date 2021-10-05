import {MigrationInterface, QueryRunner} from "typeorm";

export class user1633448791501 implements MigrationInterface {
    name = 'user1633448791501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastSeen"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastSeen" date NOT NULL DEFAULT '"2021-10-05T15:46:33.190Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastSeen"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastSeen" TIMESTAMP NOT NULL`);
    }

}
