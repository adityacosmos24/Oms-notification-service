import { Injectable } from '@nestjs/common';
import { CommsEventType } from '../config/comms.enum';
import { HelpersService } from '../services/helpers.service';
import { MessageTypeResolver } from '../resolvers/message-type.resolver';
import { MessageContext } from '../types/message-context.type';
import { AbstractEventHandler } from './abstract-event.handler';

@Injectable()
export class ExchangeHandler extends AbstractEventHandler {
  readonly supportedEvents = [
    CommsEventType.EXCHANGE_INITIATED,
    CommsEventType.EXCHANGE_CANCELLED,
  ];

  constructor(
    messageTypeResolver: MessageTypeResolver,
    private readonly helpersService: HelpersService,
  ) {
    super(messageTypeResolver);
  }

  protected fetchEventDetails(context: MessageContext) {
    return this.helpersService.getExchangeDetails(context.orderId);
  }
}
