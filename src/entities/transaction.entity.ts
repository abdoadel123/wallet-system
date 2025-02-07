import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity, TransactionType, UUID } from '../common';
import { User } from './user.entity';

@Entity({ name: 'transactions' })
export class Transaction extends AbstractEntity {
  @Column({ type: 'uuid' })
  userId: UUID;

  @Column({ unique: true })
  transactionId: string;

  @Column({ unique: true })
  reference: string;

  @Column({ type: 'decimal' })
  currentBalance: number;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
