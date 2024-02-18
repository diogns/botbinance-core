import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from './account.entity';
import { PairEntity } from './pair.entity';

@Entity({ name: 'positionSetting' })
export class PositionSettingEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  flag!: string;

  @Column({ type: 'float' })
  stopLoss!: number;

  @Column({ type: 'int' })
  openPositions!: number;

  @ManyToOne(() => AccountEntity, (account) => account.positionsSettings)
  account!: AccountEntity;

  @ManyToOne(() => PairEntity, (pair) => pair.positionsSettings)
  pair!: PairEntity;
}
