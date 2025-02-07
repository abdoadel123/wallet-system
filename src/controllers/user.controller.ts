import { Body, Controller, Param, Post } from '@nestjs/common';
import { UUID } from '../common';
import { TransactionDTO, UserDTO } from '../dtos';
import { UserService } from '../services';

@Controller('/api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/users')
  async create(@Body() dto: UserDTO) {
    return this.userService.createUser(dto);
  }

  @Post('users/:id/top-up')
  async toUp(@Param('id') id: UUID, @Body() dto: TransactionDTO) {
    return this.userService.topUP(id, dto);
  }

  @Post('users/:id/charge')
  async charge(@Param('id') id: UUID, @Body() dto: TransactionDTO) {
    return this.userService.charge(id, dto);
  }
}
