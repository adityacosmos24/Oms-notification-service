import { Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { RefundEntity } from '../entities/refund.entity';

@Controller('test-data')
export class TestDataController {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(RefundEntity)
    private readonly refundRepository: Repository<RefundEntity>,
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

    return {
      success: true,
      message: 'Seeded order and refund test data',
    };
  }
}