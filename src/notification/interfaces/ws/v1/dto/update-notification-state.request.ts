import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateNotificationStateRequestDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'notification user' })
  user: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'notification user group name' })
  user_group: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'notification title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'notification message body' })
  message: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ description: 'notification app from' })
  app: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ description: 'notification country iso' })
  country: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'notification exp time' })
  exp: number;
}
