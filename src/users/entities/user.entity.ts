import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { MeshNode } from '../../mesh-nodes/entities/mesh-node.entity';
import { Solution } from '../../solutions/entities/solution.entity';
import { Exclude } from 'class-transformer';
import { Role } from './enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Exclude()
@Column({ name: 'password_hash', type: 'varchar', length: 255 })
passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MeshNode, meshNode => meshNode.createdBy)
  meshNodes: MeshNode[];

  @OneToMany(() => Solution, solution => solution.submittedBy)
  solutions: Solution[];

  @Column({ type: 'text', nullable: true })
bio?: string | null;


@Column({ type: 'enum', enum: Role, default: Role.USER })
role: Role;
}
