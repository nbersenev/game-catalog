import { IsNotEmpty, IsString } from 'class-validator';

export class SearchFromSteamDto {
  @IsString()
  @IsNotEmpty()
  query!: string;
}
