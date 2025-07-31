import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { MeshNode } from '../../mesh-nodes/entities/mesh-node.entity';

@Entity('solutions')
export class Solution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column({ default: 0 })
  upvotes: number;

  @Column({ default: 0 })
  downvotes: number;

  @Column({ default: 0 })
  totalVotes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.solutions, { nullable: false })
  @JoinColumn({ name: 'submitted_by' })
  submittedBy: User;

  @ManyToOne(() => MeshNode, meshNode => meshNode.solutions, { nullable: false })
  @JoinColumn({ name: 'mesh_node_id' })
  meshNode: MeshNode;
}
