import { Injectable, BadRequestException } from '@nestjs/common';
import { MessageContext } from '../types/message-context.type';

@Injectable()
export class SmsProcessor {
  process(context: MessageContext): void {
    if (!context.messageKey) {
      throw new BadRequestException('messageKey is missing in context');
    }

    const orderId = context.orderId ?? '';
    const refundAmount = context.additionalData.refundAmount;

    switch (context.messageKey) {
      case 'ORDER_CONFIRM':
        context.smsMessage = `Order ${orderId} confirmed successfully.`;
        return;

      case 'ORDER_SHIPPED':
        context.smsMessage = `Order ${orderId} shipped successfully.`;
        return;

      case 'ORDER_DELIVERED':
        context.smsMessage = `Order ${orderId} delivered successfully.`;
        return;

      case 'ORDER_CANCELLED':
        context.smsMessage = `Order ${orderId} has been cancelled.`;
        return;

      case 'ORDER_FAILED':
        context.smsMessage = `Order ${orderId} failed.`;
        return;

      case 'RETURN_INITIATED':
        context.smsMessage = `Return initiated for order ${orderId}.`;
        return;

      case 'RETURN_CANCELLED':
        context.smsMessage = `Return cancelled for order ${orderId}.`;
        return;

      case 'EXCHANGE_INITIATED':
        context.smsMessage = `Exchange initiated for order ${orderId}.`;
        return;

      case 'EXCHANGE_CANCELLED':
        context.smsMessage = `Exchange cancelled for order ${orderId}.`;
        return;

      case 'REFUND_INITIATED':
        context.smsMessage = `Refund of ₹${refundAmount} initiated for order ${orderId}.`;
        return;

      default:
        throw new BadRequestException(
          `Unsupported messageKey for sms: ${context.messageKey}`,
        );
    }
  }
}