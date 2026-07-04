import { Injectable, BadRequestException } from '@nestjs/common';
import { MessageContext } from '../types/message-context.type';

@Injectable()
export class EmailProcessor {
  process(context: MessageContext): void {
    if (!context.messageKey) {
      throw new BadRequestException('messageKey is missing in context');
    }

    switch (context.messageKey) {
      case 'ORDER_CONFIRM':
        context.emailMessage = `Hi ${
          context.additionalData.customerName ?? 'Customer'
        }, your order ${context.orderId ?? ''} has been confirmed.`;
        return;

      case 'ORDER_SHIPPED':
        context.emailMessage = `Hi ${
          context.additionalData.customerName ?? 'Customer'
        }, your order ${context.orderId ?? ''} has been shipped.`;
        return;

      case 'ORDER_DELIVERED':
        context.emailMessage = `Hi ${
          context.additionalData.customerName ?? 'Customer'
        }, your order ${context.orderId ?? ''} has been delivered.`;
        return;

      case 'ORDER_CANCELLED':
        context.emailMessage = `Your order ${context.orderId ?? ''} has been cancelled.`;
        return;

      case 'ORDER_FAILED':
        context.emailMessage = `Your order ${context.orderId ?? ''} has failed.`;
        return;

      case 'RETURN_INITIATED':
        context.emailMessage = `Return initiated for order ${context.orderId ?? ''}.`;
        return;

      case 'RETURN_CANCELLED':
        context.emailMessage = `Return cancelled for order ${context.orderId ?? ''}.`;
        return;

      case 'EXCHANGE_INITIATED':
        context.emailMessage = `Exchange initiated for order ${context.orderId ?? ''}.`;
        return;

      case 'EXCHANGE_CANCELLED':
        context.emailMessage = `Exchange cancelled for order ${context.orderId ?? ''}.`;
        return;

      case 'REFUND_INITIATED':
        context.emailMessage = `Refund initiated for order ${context.orderId ?? ''}.`;
        return;

      default:
        throw new BadRequestException(
          `Unsupported messageKey for email: ${context.messageKey}`,
        );
    }
  }
}