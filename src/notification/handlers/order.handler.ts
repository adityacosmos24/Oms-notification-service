import { Injectable, BadRequestException } from '@nestjs/common';
import { IEventHandler } from '../interfaces/event-handler.interface';
import { MessageContext } from '../types/message-context.type';
import {
  CommsEventType,
  EmailMessageType,
  SmsMessageType,
} from '../config/comms.enum';
import { HelpersService } from '../services/helpers.service';

@Injectable()
export class OrderHandler implements IEventHandler {
  readonly supportedEvents = [
    CommsEventType.ORDER_CONFIRM,
    CommsEventType.ORDER_SHIPPED,
    CommsEventType.ORDER_DELIVERED,
    CommsEventType.ORDER_CANCELLED,
    CommsEventType.ORDER_FAILED,
  ];

  constructor(private readonly helpersService: HelpersService) {}

  async handle(context: MessageContext): Promise<void> {
    await this.enrichOrderData(context);

    switch (context.eventType) {
      case CommsEventType.ORDER_CONFIRM:
        context.emailMessageType = EmailMessageType.ORDER_CONFIRM;
        context.smsMessageType = this.resolveOrderConfirmSmsType(context);
        return;

      case CommsEventType.ORDER_SHIPPED:
        context.emailMessageType = EmailMessageType.ORDER_SHIPPED;
        context.smsMessageType = this.resolveOrderShippedSmsType(context);
        return;

      case CommsEventType.ORDER_DELIVERED:
        context.emailMessageType = EmailMessageType.ORDER_DELIVERED;
        context.smsMessageType = SmsMessageType.ORDER_DELIVERED;
        return;

      case CommsEventType.ORDER_CANCELLED:
        context.emailMessageType = EmailMessageType.ORDER_CANCELLED;
        context.smsMessageType = SmsMessageType.ORDER_CANCELLED;
        return;

      case CommsEventType.ORDER_FAILED:
        context.emailMessageType = EmailMessageType.ORDER_FAILED;
        context.smsMessageType = SmsMessageType.ORDER_FAILED;
        return;

      default:
        throw new BadRequestException(
          `OrderHandler does not support event ${context.eventType}`,
        );
    }
  }

  private async enrichOrderData(context: MessageContext): Promise<void> {
    const orderDetails = await this.helpersService.getOrderDetails(
      context.orderId,
    );

    if (!orderDetails) return;

    context.additionalData = {
      ...context.additionalData,
      ...orderDetails,
    };
  }

  private resolveOrderConfirmSmsType(
    context: MessageContext,
  ): SmsMessageType {
    const itemCount = context.additionalData.itemCount ?? 1;

    if (itemCount > 1) {
      return SmsMessageType.ORDER_CONFIRM_QTY_MORE;
    }

    return SmsMessageType.ORDER_CONFIRM;
  }

  private resolveOrderShippedSmsType(
    context: MessageContext,
  ): SmsMessageType {
    const itemCount = context.additionalData.itemCount ?? 1;

    if (itemCount === 2) {
      return SmsMessageType.ORDER_SHIPPED_QTY_2;
    }

    return SmsMessageType.ORDER_SHIPPED;
  }
}