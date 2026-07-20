import { Injectable } from '@nestjs/common';
import { CommsEventType } from '../config/comms.enum';
import { HelpersService } from '../services/helpers.service';
import { MessageTypeResolver } from '../resolvers/message-type.resolver';
import { MessageContext } from '../types/message-context.type';
import { AbstractEventHandler } from './abstract-event.handler';

@Injectable()
export class OrderHandler extends AbstractEventHandler {
  readonly supportedEvents = [
    CommsEventType.ORDER_CONFIRM,
    CommsEventType.ORDER_SHIPPED,
    CommsEventType.ORDER_DELIVERED,
    CommsEventType.ORDER_DELIVERY_DELAYED,
    CommsEventType.ORDER_CANCELLED,
    CommsEventType.ORDER_FAILED,
  ];

  constructor(
    messageTypeResolver: MessageTypeResolver,
    private readonly helpersService: HelpersService,
  ) {
    super(messageTypeResolver);
  }

  protected fetchEventDetails(context: MessageContext) {
    return this.helpersService.getOrderDetails(context.orderId);
  }
}
