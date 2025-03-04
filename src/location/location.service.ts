import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto);
    return this.locationRepository.save(location);
  }

  findAll() {
    return this.locationRepository.find({ relations: ['parent', 'children'] });
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    await this.locationRepository.update(id, updateLocationDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.locationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Location not found');
    }
  }
}
