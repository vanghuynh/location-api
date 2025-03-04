import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'name  e.g., "A Car Park"' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'location number,  e.g., "A-CarPark"' })
  @IsString()
  @IsNotEmpty()
  location_number: string;

  @IsNumber()
  @ApiProperty({ description: 'area, e.g., 80.620', type: 'number' })
  area: number;

  @ApiPropertyOptional({
    description:
      'parentId, Reference to parent location (e.g., "A Level 1" is the parent of "A Lobby Level1")',
  })
  @IsOptional()
  @IsNumber()
  parentId?: number;
}
