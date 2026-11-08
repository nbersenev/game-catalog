import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFromSteamDto {
  @IsNumber()
  @IsNotEmpty()
  steamAppId!: number;
}
