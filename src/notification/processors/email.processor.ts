import { Injectable, BadRequestException } from '@nestjs/common';
import { MessageContext } from '../types/message-context.type';

@Injectable()
export class EmailProcessor {
  process(context: MessageContext): void {
    if (!context.messageKey) {
      throw new BadRequestException('messageKey is missing in context');
    }

    const customerName = context.additionalData.customerName ?? 'Customer';
    const orderId = context.orderId ?? '';
    const orderAmount = context.additionalData.orderAmount;
    const itemCount = context.additionalData.itemCount;
    const refundAmount = context.additionalData.refundAmount;
    const refundMode = context.additionalData.refundMode;
    const exchangeProductName = context.additionalData.exchangeProductName;

    switch (context.messageKey) {
      case 'ORDER_CONFIRM':
        context.emailMessage = `Hi ${customerName}, your order ${orderId} has been confirmed. Total amount: ₹${orderAmount}. Items: ${itemCount}.`;
        return;

      case 'ORDER_SHIPPED':
        context.emailMessage = `Hi ${customerName}, your order ${orderId} has been shipped.`;
        return;

      case 'ORDER_DELIVERED':
        context.emailMessage = `Hi ${customerName}, your order ${orderId} has been delivered.`;
        return;

      case 'ORDER_CANCELLED':
        context.emailMessage = `Hi ${customerName}, your order ${orderId} has been cancelled.`;
        return;

      case 'ORDER_FAILED':
        context.emailMessage = `Hi ${customerName}, your order ${orderId} has failed.`;
        return;

      case 'RETURN_INITIATED':
        context.emailMessage = `Hi ${customerName}, return has been initiated for order ${orderId}.`;
        return;

      case 'RETURN_CANCELLED':
        context.emailMessage = `Hi ${customerName}, return has been cancelled for order ${orderId}.`;
        return;

      case 'EXCHANGE_INITIATED':
        context.emailMessage = `Hi ${customerName}, exchange has been initiated for ${exchangeProductName} in order ${orderId}.`;
        return;

      case 'EXCHANGE_CANCELLED':
        context.emailMessage = `Hi ${customerName}, exchange has been cancelled for order ${orderId}.`;
        return;

      case 'REFUND_INITIATED':
        context.emailMessage = `Hi ${customerName}, refund of ₹${refundAmount} has been initiated for order ${orderId} via ${refundMode}.`;
        return;

      default:
        throw new BadRequestException(
          `Unsupported messageKey for email: ${context.messageKey}`,
        );
    }
  }
}