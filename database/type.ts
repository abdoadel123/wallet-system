export interface IColumn {
  name: string;
  type: string;
  length?: string;
  isUnique?: boolean;
  isPrimary?: boolean;
  enum?: string[];
  default?: any;
  isNullable: boolean;
  isArray?: boolean;
}

export enum TableNames {
  users = 'users',
  transactions = 'transactions',
}

export enum ColumnTypes {
  boolean = 'boolean',
  varchar = 'varchar',
  uuid = 'uuid',
  timestamp = 'timestamp',
  date = 'date',
  int = 'int8',
  enum = 'enum',
  decimal = 'decimal',
}
