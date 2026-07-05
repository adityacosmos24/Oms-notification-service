import { Injectable, BadRequestException } from '@nestjs/common';
import { MessageContext } from '../types/message-context.type';
import { EmailMessageType } from '../config/comms.enum';

@Injectable()
export class EmailProcessor {
  process(context: MessageContext): void {
    if (!context.emailMessageType) {
      throw new BadRequestException('emailMessageType is missing in context');
    }

    const customerName = context.additionalData.customerName ?? 'Customer';
    const orderId = context.orderId ?? '';
    const orderAmount = context.additionalData.orderAmount;
    const itemCount = context.additionalData.itemCount;
    const refundAmount = context.additionalData.refundAmount;
    const refundMode = context.additionalData.refundMode;
    const exchangeProductName = context.additionalData.exchangeProductName;

    switch (context.emailMessageType) {
      case EmailMessageType.ORDER_CONFIRM:
        context.emailMessage = `Hi ${customerName}, your order ${orderId} has been confirmed. Total amount: ₹${orderAmount}. Items: ${itemCount}.`;
        return;

      case EmailMessageType.ORDER_SHIPPED:
        context.emailMessage = `Hi ${customerName}, your order ${orderId} has been shipped.`;
        return;

      case EmailMessageType.ORDER_DELIVERED:
        context.emailMessage = `Hi ${customerName}, your order ${orderId} has been delivered.`;
        return;

      case EmailMessageType.ORDER_CANCELLED:
        context.emailMessage = `Hi ${customerName}, your order ${orderId} has been cancelled.`;
        return;

      case EmailMessageType.ORDER_FAILED:
        context.emailMessage = `Hi ${customerName}, your order ${orderId} has failed.`;
        return;

      case EmailMessageType.RETURN_INITIATED:
        context.emailMessage = `Hi ${customerName}, return has been initiated for order ${orderId}.`;
        return;

      case EmailMessageType.RETURN_CANCELLED:
        context.emailMessage = `Hi ${customerName}, return has been cancelled for order ${orderId}.`;
        return;

      case EmailMessageType.EXCHANGE_INITIATED:
        context.emailMessage = `Hi ${customerName}, exchange has been initiated for ${exchangeProductName} in order ${orderId}.`;
        return;

      case EmailMessageType.EXCHANGE_CANCELLED:
        context.emailMessage = `Hi ${customerName}, exchange has been cancelled for order ${orderId}.`;
        return;

      case EmailMessageType.REFUND_INITIATED:
        context.emailMessage = `Hi ${customerName}, refund of ₹${refundAmount} has been initiated for order ${orderId} via ${refundMode}.`;
        return;

      default:
        throw new BadRequestException(
          `Unsupported emailMessageType: ${context.emailMessageType}`,
        );
    }
  }
}