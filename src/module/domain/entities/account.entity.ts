import { ApiProperty } from '@nestjs/swagger';

export class AccountEntity {
  @ApiProperty({ type: 'string', example: 'rmorales' })
  username!: string;

  @ApiProperty({ type: 'string', example: 'Raúl' })
  name!: string;

  constructor(username: string = '', name: string = '') {
    this.username = username;
    this.name = name;
  }
}
