import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  fixedDecimalPoint,
  randomAlphabet,
  randomNumeric,
  TransactionType,
  UUID,
} from '../common';
import { TransactionDTO, UserDTO } from '../dtos';
import { Transaction, User } from '../entities';
import { TransactionRepository, UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly datasource: DataSource,
  ) {}

  async createUser(dto: UserDTO) {
    const existEmail = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (existEmail) throw new BadRequestException('User Email already exist');

    const user = this.userRepository.create(dto);

    return this.userRepository.save(user);
  }

  async charge(userId: UUID, dto: TransactionDTO) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) throw new NotFoundException('User Not Found');

    await this.transactionValidation(user, dto, TransactionType.charge);

    const transactionId = this.generateTransactionId();

    // run operation into transaction to rollback in case of failures
    return this.datasource.transaction(async (entityManager) => {
      const currentBalance = fixedDecimalPoint(user.balance);

      user.balance =
        fixedDecimalPoint(user.balance) - fixedDecimalPoint(dto.amount);

      await entityManager.save(user);

      //save balance before update into transaction as a history
      const transaction = entityManager.create(Transaction, {
        ...dto,
        userId,
        transactionId,
        currentBalance,
        type: TransactionType.charge,
      });

      await entityManager.save(transaction);

      return user;
    });
  }

  async topUP(userId: UUID, dto: TransactionDTO) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) throw new NotFoundException('User Not Found');

    await this.transactionValidation(user, dto, TransactionType.topUp);

    const transactionId = this.generateTransactionId();

    // run operation into transaction to rollback in case of failures
    return this.datasource.transaction(async (entityManager) => {
      const currentBalance = user.balance;

      user.balance =
        fixedDecimalPoint(user.balance) + fixedDecimalPoint(dto.amount);

      const savedUser = await entityManager.save(user);

      //save balance before update into transaction as a history
      const transaction = entityManager.create(Transaction, {
        ...dto,
        userId,
        transactionId,
        currentBalance,
        type: TransactionType.topUp,
      });

      await entityManager.save(transaction);

      return savedUser;
    });
  }

  private async transactionValidation(
    user: User,
    dto: TransactionDTO,
    type: TransactionType,
  ) {
    const existTransactionReference =
      await this.transactionRepository.findOneBy({ reference: dto.reference });

    if (existTransactionReference)
      throw new BadRequestException('Duplicated Operation');

    //if to up, no need to validate balance
    if (type === TransactionType.topUp) return;

    if (fixedDecimalPoint(user.balance) - fixedDecimalPoint(dto.amount) < 0)
      throw new BadRequestException(
        'Can not perform operation, User Balance can not be negative',
      );
  }

  private generateTransactionId() {
    // to generate random transaction id combine alphabet and number ex: ABCDE-12345
    //make id more readable
    return `${randomAlphabet()}-${randomNumeric()}`;
  }
}
