import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../common';
import { Transaction } from '../entities';

@Injectable()
export class TransactionRepository extends BaseRepository<Transaction> {
  constructor(private dataSource: DataSource) {
    super(Transaction, dataSource);
  }
}
