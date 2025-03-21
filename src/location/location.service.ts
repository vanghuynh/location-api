import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  async create(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto);
    const parentId = createLocationDto.parentId;
    if (parentId) {
      const parentLocation = await this.locationRepository.findOne({
        where: { id: parentId },
      });
      if (!parentLocation) {
        throw new NotFoundException('Parent location not found');
      }
      location.parent = parentLocation;
    }
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
    const { parentId } = updateLocationDto;

    // Fetch the node being updated
    const node = await this.findOne(id);
    if (!node) {
      throw new NotFoundException('Location not found');
    }

    if (parentId) {
      // Check if the new parent is a descendant of the node
      const isRecursive = await this.isDescendant(id, parentId);
      if (isRecursive) {
        throw new BadRequestException(
          'Cannot set a child node as the parent of its ancestor',
        );
      }

      // Fetch the new parent node to ensure it exists
      const parentNode = await this.locationRepository.findOne({
        where: { id: parentId },
      });
      if (!parentNode) {
        throw new NotFoundException('Parent location not found');
      }

      // Update the parent relationship
      node.parent = parentNode;
    } else {
      // If no parentId is provided, set the parent to null
      node.parent = undefined;
    }

    // Save the updated node
    return this.locationRepository.save(node);
  }

  // Helper method to check if a node is a descendant of another node
  private async isDescendant(
    nodeId: number,
    parentId: number,
  ): Promise<boolean> {
    if (nodeId === parentId) {
      return true;
    }

    const parent = await this.locationRepository.findOne({
      where: { id: parentId },
      relations: ['parent'],
    });

    if (!parent || !parent.parent) {
      return false;
    }

    return this.isDescendant(nodeId, parent.parent.id);
  }

  async remove(id: number) {
    const result = await this.locationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Location not found');
    }
    return result;
  }
}
