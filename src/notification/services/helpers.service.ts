import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { RefundEntity } from '../entities/refund.entity';
import { OrderItemEntity } from '../entities/order-item.entity';

@Injectable()
export class HelpersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(RefundEntity)
    private readonly refundRepository: Repository<RefundEntity>,

    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async getOrderDetails(orderId: string) {
    const order = await this.orderRepository.findOne({
      where: { orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order not found for orderId=${orderId}`);
    }

    const orderItems = await this.orderItemRepository.find({
      where: { orderId },
    });

    const totalItemCount = orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    return {
      orderId: order.orderId,
      userId: order.userId,
      tenantId: order.tenantId,
      customerName: order.customerName,
      email: order.email,
      phone: order.phone,
      orderAmount: Number(order.orderAmount),

      // Prefer the real per-item quantities; fall back to the denormalized count
      itemCount: totalItemCount || order.itemCount,

      items: orderItems.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        price: Number(item.price),
      })),

      status: order.status,
    };
  }

  async getRefundDetails(orderId: string) {
    const refund = await this.refundRepository.findOne({
      where: { orderId },
    });

    if (!refund) {
      throw new NotFoundException(`Refund not found for orderId=${orderId}`);
    }

    return {
      orderId: refund.orderId,
      tenantId: refund.tenantId,
      refundAmount: Number(refund.refundAmount),
      refundMode: refund.refundMode,
      status: refund.status,
    };
  }

  async getReturnDetails(orderId: string) {
    return {
      orderId,
      returnStatus: 'INITIATED',
    };
  }

  async getExchangeDetails(orderId: string) {
    return {
      orderId,
      exchangeStatus: 'INITIATED',
    };
  }
}