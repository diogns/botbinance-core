import { ApiProperty } from '@nestjs/swagger';

export class SignalEntity {
  @ApiProperty({ type: 'number', example: 8869 })
  value!: number;

  @ApiProperty({ type: 'string', example: 'BTC/USTD' })
  pair!: string;

  @ApiProperty({ type: 'string', example: 'BUY' })
  signal!: string;

  constructor(value: number = 0, pair: string = '', signal: string = '') {
    this.value = value;
    this.pair = pair;
    this.signal = signal;
  }
}
