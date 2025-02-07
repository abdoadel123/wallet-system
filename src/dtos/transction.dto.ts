import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class TransactionDTO {
  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;
}
