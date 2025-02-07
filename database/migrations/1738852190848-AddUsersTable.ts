import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserColumns } from '../columns';
import { defaultTableConfig } from '../config';
import { TableNames } from '../type';

export class AddUsersTable1738852190848 implements MigrationInterface {
  private tableName = `${TableNames.users}`;
  private table = defaultTableConfig(this.tableName, UserColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true);
  }
}
