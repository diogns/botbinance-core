import { ApiProperty } from '@nestjs/swagger';

export class PairEntity {
  @ApiProperty({ type: 'string', example: 'BTC/USTD' })
  name!: string;

  constructor(name: string = '') {
    this.name = name;
  }
}
