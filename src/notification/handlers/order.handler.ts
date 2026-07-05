import { Injectable, BadRequestException } from '@nestjs/common';
import { IEventHandler } from '../interfaces/event-handler.interface';
import { MessageContext } from '../types/message-context.type';
import { CommsEventType } from '../enums/comms-event-type.enum';
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
        context.messageKey = 'ORDER_CONFIRM';
        return;

      case CommsEventType.ORDER_SHIPPED:
        context.messageKey = 'ORDER_SHIPPED';
        return;

      case CommsEventType.ORDER_DELIVERED:
        context.messageKey = 'ORDER_DELIVERED';
        return;

      case CommsEventType.ORDER_CANCELLED:
        context.messageKey = 'ORDER_CANCELLED';
        return;

      case CommsEventType.ORDER_FAILED:
        context.messageKey = 'ORDER_FAILED';
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
}