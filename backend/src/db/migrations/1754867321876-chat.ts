import { MigrationInterface, QueryRunner } from 'typeorm';

export class Chat1754867321876 implements MigrationInterface {
  name = 'Chat1754867321876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat" ALTER COLUMN "name" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat" ALTER COLUMN "name" SET NOT NULL`,
    );
  }
}
