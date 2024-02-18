import { ApiProperty } from '@nestjs/swagger';

export class PositionEntity {
  @ApiProperty({ type: 'string', example: 'BUY_1' })
  flag!: string;

  @ApiProperty({ type: 'number', example: 0 })
  type!: number;

  @ApiProperty({ type: 'number', example: 1 })
  signalId!: number;

  @ApiProperty({ type: 'number', example: 2 })
  accountId!: number;

  @ApiProperty({ type: 'number', example: 3 })
  pairId!: number;

  constructor(
    flag: string = '',
    type: number = 0,
    signalId: number = 0,
    accountId: number = 0,
    pairId: number = 0,
  ) {
    this.flag = flag;
    this.type = type;
    this.signalId = signalId;
    this.accountId = accountId;
    this.pairId = pairId;
  }
}
