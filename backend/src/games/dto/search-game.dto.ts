import { IsNotEmpty, IsString } from 'class-validator';

export class SearchGameDto {
  @IsString()
  @IsNotEmpty()
  query!: string;
}