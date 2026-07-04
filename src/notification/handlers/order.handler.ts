import { Injectable, BadRequestException } from '@nestjs/common';
import { IEventHandler } from '../interfaces/event-handler.interface';
import { MessageContext } from '../types/message-context.type';
import { CommsEventType } from '../enums/comms-event-type.enum';

@Injectable()
export class OrderHandler implements IEventHandler {
  readonly supportedEvents = [
    CommsEventType.ORDER_CONFIRM,
    CommsEventType.ORDER_SHIPPED,
    CommsEventType.ORDER_DELIVERED,
    CommsEventType.ORDER_CANCELLED,
    CommsEventType.ORDER_FAILED,
  ];

  async handle(context: MessageContext): Promise<void> {
    switch (context.eventType) {
      case CommsEventType.ORDER_CONFIRM:
        context.emailMessage = `Hi ${
          context.additionalData.customerName ?? 'Customer'
        }, your order ${context.orderId ?? ''} has been confirmed.`;
        context.smsMessage = `Order ${
          context.orderId ?? ''
        } confirmed successfully.`;
        return;

      case CommsEventType.ORDER_SHIPPED:
        context.emailMessage = `Hi ${
          context.additionalData.customerName ?? 'Customer'
        }, your order ${context.orderId ?? ''} has been shipped.`;
        context.smsMessage = `Order ${
          context.orderId ?? ''
        } shipped successfully.`;
        return;

      case CommsEventType.ORDER_DELIVERED:
        context.emailMessage = `Hi ${
          context.additionalData.customerName ?? 'Customer'
        }, your order ${context.orderId ?? ''} has been delivered.`;
        context.smsMessage = `Order ${
          context.orderId ?? ''
        } delivered successfully.`;
        return;

      case CommsEventType.ORDER_CANCELLED:
        context.emailMessage = `Your order ${
          context.orderId ?? ''
        } has been cancelled.`;
        context.smsMessage = `Order ${
          context.orderId ?? ''
        } has been cancelled.`;
        return;

      case CommsEventType.ORDER_FAILED:
        context.emailMessage = `Your order ${
          context.orderId ?? ''
        } has failed.`;
        context.smsMessage = `Order ${context.orderId ?? ''} failed.`;
        return;

      default:
        throw new BadRequestException(
          `OrderHandler does not support event ${context.eventType}`,
        );
    }
  }
}