import { ColumnTypes, IColumn } from '../type';

export const UserColumns: IColumn[] = [
  {
    name: 'name',
    type: ColumnTypes.varchar,
    isNullable: false,
  },
  {
    name: 'email',
    type: ColumnTypes.varchar,
    isNullable: false,
    isUnique: true,
  },
  {
    name: 'birth_date',
    type: ColumnTypes.date,
    isNullable: false,
  },
  {
    name: 'balance',
    type: ColumnTypes.decimal,
    isNullable: false,
    default: 0,
  },
];
