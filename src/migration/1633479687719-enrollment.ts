import {MigrationInterface, QueryRunner} from "typeorm";

export class enrollment1633479687719 implements MigrationInterface {
    name = 'enrollment1633479687719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enrollment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "course_name" character varying NOT NULL, "author" character varying NOT NULL, "category" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_7e200c699fa93865cdcdd025885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastSeen" SET DEFAULT '"2021-10-06T00:21:29.424Z"'`);
        await queryRunner.query(`ALTER TABLE "enrollment" ADD CONSTRAINT "FK_e97ecbf11356b5173ce7fb0b060" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment" DROP CONSTRAINT "FK_e97ecbf11356b5173ce7fb0b060"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastSeen" SET DEFAULT '2021-10-05'`);
        await queryRunner.query(`DROP TABLE "enrollment"`);
    }

}
