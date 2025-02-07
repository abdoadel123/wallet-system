import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../common';
import { Transaction } from './transaction.entity';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ type: 'decimal', default: 0 })
  balance: number;

  @OneToMany(() => Transaction, (transactions) => transactions.user)
  transactions?: Transaction[];
}
