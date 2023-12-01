import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class AddNotificationRequestDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ description: 'notification country iso' })
  country: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'notification user group name' })
  user_group: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ description: 'notification app from' })
  app: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'notification title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'notification subtitle' })
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'notification message body' })
  message: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'notification expiration time' })
  exp: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'notification duration time' })
  duration: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'notification extra params' })
  extra_params: string;
}
