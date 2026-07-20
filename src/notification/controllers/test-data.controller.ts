import { Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { RefundEntity } from '../entities/refund.entity';
import { OrderItemEntity } from '../entities/order-item.entity';

@Controller('test-data')
export class TestDataController {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(RefundEntity)
    private readonly refundRepository: Repository<RefundEntity>,

    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  @Post('seed')
  async seed() {
    await this.orderRepository.save({
      orderId: 'ORD_1001',
      userId: 'u1',
      tenantId: 'bewakoof',
      customerName: 'Aditya',
      email: 'aditya@example.com',
      phone: '9876543210',
      orderAmount: 2499,
      itemCount: 2,
      status: 'CONFIRMED',
    });

    await this.refundRepository.save({
      orderId: 'ORD_1001',
      tenantId: 'bewakoof',
      refundAmount: 499,
      refundMode: 'WALLET',
      status: 'INITIATED',
    });

    // seed order items
    await this.orderItemRepository.delete({ orderId: 'ORD_1001' });

    await this.orderItemRepository.save([
      {
        orderId: 'ORD_1001',
        productName: 'Oversized T-Shirt',
        quantity: 1,
        price: 999,
      },
      {
        orderId: 'ORD_1001',
        productName: 'Cargo Joggers',
        quantity: 1,
        price: 1500,
      },
    ]);

    return {
      success: true,
      message: 'Seeded order, refund and order-item test data',
    };
  }
}