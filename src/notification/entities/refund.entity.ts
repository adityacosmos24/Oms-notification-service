import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'refunds' })
export class RefundEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @Column()
  tenantId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  refundAmount: number;

  @Column()
  refundMode: string; // WALLET / BANK / PG

  @Column({ default: 'INITIATED' })
  status: string;
}