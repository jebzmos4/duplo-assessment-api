import {MigrationInterface, QueryRunner} from "typeorm";

export class user1633474069589 implements MigrationInterface {
    name = 'user1633474069589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "emaillVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastSeen" SET DEFAULT '"2021-10-05T22:47:51.357Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastSeen" SET DEFAULT '2021-10-05'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "emaillVerified"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
    }

}
