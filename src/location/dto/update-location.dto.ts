import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdateLocationDto {
  @ApiPropertyOptional({
    description: 'name  e.g., "A Car Park"',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'location number,  e.g., "A-CarPark"',
  })
  @IsOptional()
  @IsString()
  location_number?: string;

  @ApiPropertyOptional({
    description: 'area, e.g., 80.620',
  })
  @IsOptional()
  @IsNumber()
  area?: number;

  @ApiPropertyOptional({
    description:
      'parentId, Reference to parent location (e.g., "A Level 1" is the parent of "A Lobby Level1")',
  })
  @IsOptional()
  @IsNumber()
  parentId?: number;
}
