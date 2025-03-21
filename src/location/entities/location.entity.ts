import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string; // e.g., "A Car Park"

  @Column({ type: 'varchar', length: 100, unique: true })
  location_number: string; // e.g., "A-CarPark"

  @Column({ type: 'float' })
  area: number; // e.g., 80.620

  @ManyToOne(() => Location, (location) => location.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent?: Location; // Reference to parent location (e.g., "A Level 1" is the parent of "A Lobby Level1")

  @OneToMany(() => Location, (location) => location.parent)
  children: Location[];
}
