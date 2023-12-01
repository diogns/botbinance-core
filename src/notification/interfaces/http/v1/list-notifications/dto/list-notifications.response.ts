import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ListNotificationsResponseDTO {
  @IsString()
  @ApiProperty()
  user_group: string;

  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  message: string;

  @IsString()
  @ApiProperty()
  app: string;

  @IsString()
  @ApiProperty()
  country: string;

  @IsString()
  @ApiProperty()
  exp: number;

  constructor(
    user_group: string,
    id: string,
    title: string,
    message: string,
    app: string,
    country: string,
    exp: number,
  ) {
    this.user_group = user_group;
    this.id = id;
    this.title = title;
    this.message = message;
    this.app = app;
    this.country = country;
    this.exp = exp;
  }
}
