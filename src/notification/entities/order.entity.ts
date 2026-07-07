import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  orderId: string;

  @Column()
  userId: string;

  @Column()
  tenantId: string;

  @Column()
  customerName: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  orderAmount: number;

  @Column({ type: 'int', default: 1 })
  itemCount: number;

  @Column({ default: 'CONFIRMED' })
  status: string;
}