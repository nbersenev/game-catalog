import { IsOptional, IsString } from 'class-validator';

export class GetListDto {
  @IsOptional()
  @IsString()
  name?: string;
}
