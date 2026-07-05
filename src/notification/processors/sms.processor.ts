import { Injectable, BadRequestException } from '@nestjs/common';
import { MessageContext } from '../types/message-context.type';

@Injectable()
export class SmsProcessor {
  process(context: MessageContext): void {
    if (!context.messageKey) {
      throw new BadRequestException('messageKey is missing in context');
    }

    switch (context.messageKey) {
      case 'ORDER_CONFIRM':
        context.smsMessage = `Order ${context.orderId ?? ''} confirmed successfully.`;
        return;

      case 'ORDER_SHIPPED':
        context.smsMessage = `Order ${context.orderId ?? ''} shipped successfully.`;
        return;

      case 'ORDER_DELIVERED':
        context.smsMessage = `Order ${context.orderId ?? ''} delivered successfully.`;
        return;

      case 'ORDER_CANCELLED':
        context.smsMessage = `Order ${context.orderId ?? ''} has been cancelled.`;
        return;

      case 'ORDER_FAILED':
        context.smsMessage = `Order ${context.orderId ?? ''} failed.`;
        return;

      case 'RETURN_INITIATED':
        context.smsMessage = `Return initiated for order ${context.orderId ?? ''}.`;
        return;

      case 'RETURN_CANCELLED':
        context.smsMessage = `Return cancelled for order ${context.orderId ?? ''}.`;
        return;

      case 'EXCHANGE_INITIATED':
        context.smsMessage = `Exchange initiated for order ${context.orderId ?? ''}.`;
        return;

      case 'EXCHANGE_CANCELLED':
        context.smsMessage = `Exchange cancelled for order ${context.orderId ?? ''}.`;
        return;

      case 'REFUND_INITIATED':
        context.smsMessage = `Refund initiated for order ${context.orderId ?? ''}.`;
        return;

      default:
        throw new BadRequestException(
          `Unsupported messageKey for sms: ${context.messageKey}`,
        );
    }
  }
}