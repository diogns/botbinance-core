import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PairEntity } from './pair.entity';
import { PositionEntity } from './position.entity';

@Entity({ name: 'signal' })
export class SignalEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'float' })
  value!: number;

  @ManyToOne(() => PairEntity, (pair) => pair.signals)
  pair!: PairEntity;

  @OneToMany(() => PositionEntity, (position) => position.signal, {
    eager: true,
  })
  positions!: PositionEntity[];
}
