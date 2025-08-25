import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Solution } from '../../solutions/entities/solution.entity';

export enum MeshNodeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED'
}

@Entity('mesh_nodes')
export class MeshNode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  category: string;

  @Column('json')
  tags: string[];

  @Column({
    type: 'enum',
    enum: MeshNodeStatus,
    default: MeshNodeStatus.ACTIVE
  })
  status: MeshNodeStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.meshNodes, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @OneToMany(() => Solution, solution => solution.meshNode)
  solutions: Solution[];
}
