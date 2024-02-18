import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SignalEntity } from './signal.entity';
import { AccountEntity } from './account.entity';
import { PairEntity } from './pair.entity';

@Entity({ name: 'position' })
export class PositionEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  flag!: string;

  @Column({ type: 'int' })
  type!: number;

  @ManyToOne(() => SignalEntity, (signal) => signal.positions)
  signal!: SignalEntity;

  @ManyToOne(() => AccountEntity, (account) => account.positions)
  account!: AccountEntity;

  @ManyToOne(() => PairEntity, (pair) => pair.positions)
  pair!: PairEntity;
}
