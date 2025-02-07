import { ColumnTypes, IColumn } from '../type';

export const TransactionColumns: IColumn[] = [
  {
    name: 'user_id',
    type: ColumnTypes.uuid,
    isNullable: false,
  },
  {
    name: 'transaction_id',
    type: ColumnTypes.varchar,
    isNullable: false,
    isUnique: true,
  },
  {
    name: 'reference',
    type: ColumnTypes.varchar,
    isNullable: false,
    isUnique: true,
  },
  {
    name: 'current_balance',
    type: ColumnTypes.decimal,
    isNullable: false,
  },
  {
    name: 'amount',
    type: ColumnTypes.decimal,
    isNullable: false,
  },
  {
    name: 'type',
    type: ColumnTypes.enum,
    enum: ['TOP_UP', 'CHARGE'],
    isNullable: false,
  },
];
