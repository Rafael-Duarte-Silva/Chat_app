import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1753991068472 implements MigrationInterface {
  name = 'User1753991068472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "UQ_5e732355048e135674f657e595b"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "UQ_5e732355048e135674f657e595b" UNIQUE ("text")`,
    );
  }
}
