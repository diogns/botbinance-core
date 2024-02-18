import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { SignalEntity } from './signal.entity';
import { PositionSettingEntity } from './position-setting.entity';
import { PositionEntity } from './position.entity';

@Entity({ name: 'pair' })
export class PairEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'float' })
  value!: number;

  @OneToMany(() => SignalEntity, (signal) => signal.pair, { eager: true })
  signals!: SignalEntity[];

  @OneToMany(
    () => PositionSettingEntity,
    (positionSetting) => positionSetting.pair,
    { eager: true },
  )
  positionsSettings!: PositionSettingEntity[];

  @OneToMany(() => PositionEntity, (position) => position.pair, {
    eager: true,
  })
  positions!: PositionEntity[];
}
