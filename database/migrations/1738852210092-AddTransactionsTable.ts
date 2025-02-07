import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TransactionColumns } from '../columns';
import { defaultTableConfig } from '../config';
import { TableNames } from '../type';
export class AddTransactionsTable1738852210092 implements MigrationInterface {
  private tableName = `${TableNames.transactions}`;
  private table = defaultTableConfig(this.tableName, TransactionColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: 'transactions_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${TableNames.users}`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, 'transactions_user_id');
    await queryRunner.dropTable(this.table, true);
  }
}
