import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1753910891038 implements MigrationInterface {
  name = 'Test1753910891038';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "usersId" uuid, "chatsId" uuid, CONSTRAINT "UQ_5e732355048e135674f657e595b" UNIQUE ("text"), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_chats_chat" ("usersId" uuid NOT NULL, "chatId" uuid NOT NULL, CONSTRAINT "PK_1ea105a595d621c3df0b7d7c01c" PRIMARY KEY ("usersId", "chatId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5937b033223a9f80a2338efe42" ON "users_chats_chat" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b0c01a6065a43f9bb1bcf460a9" ON "users_chats_chat" ("chatId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_53a1cb690159f98531b71def7b6" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_03c97935b2cf1af02e080a11184" FOREIGN KEY ("chatsId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chats_chat" ADD CONSTRAINT "FK_5937b033223a9f80a2338efe426" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chats_chat" ADD CONSTRAINT "FK_b0c01a6065a43f9bb1bcf460a97" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_chats_chat" DROP CONSTRAINT "FK_b0c01a6065a43f9bb1bcf460a97"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chats_chat" DROP CONSTRAINT "FK_5937b033223a9f80a2338efe426"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_03c97935b2cf1af02e080a11184"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_53a1cb690159f98531b71def7b6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b0c01a6065a43f9bb1bcf460a9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5937b033223a9f80a2338efe42"`,
    );
    await queryRunner.query(`DROP TABLE "users_chats_chat"`);
    await queryRunner.query(`DROP TABLE "chat"`);
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
