import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location_number: string;

  @IsNumber()
  area: number;

  @IsOptional()
  @IsNumber()
  parentId?: number;
}
