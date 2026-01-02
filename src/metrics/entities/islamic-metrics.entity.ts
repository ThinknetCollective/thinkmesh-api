import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Solution } from '../../solutions/entities/solution.entity';

@Entity('islamic_metrics')
export class IslamicMetrics {
  @PrimaryGeneratedColumn()
  id: number;

  // Core Islamic Principles (each 0-25 points)
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  maslaha: number; // Public benefit

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  adalah: number; // Justice/fairness

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  ihsan: number; // Excellence

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  amanah: number; // Trustworthiness

  // Harm Prevention (-50 to 0, negative score)
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  dhararPrevention: number; // Harm avoidance

  // Overall Score (calculated: sum of all)
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  overallScore: number;

  // AI Explanation
  @Column({ type: 'text', nullable: true })
  aiExplanation: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relation to Solution (one-to-one)
  @OneToOne(() => Solution, (solution) => solution.islamicMetrics)
  solution: Solution;
}
