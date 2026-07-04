import { Injectable, BadRequestException } from '@nestjs/common';
import { IEventHandler } from '../interfaces/event-handler.interface';
import { MessageContext } from '../types/message-context.type';
import { CommsEventType } from '../enums/comms-event-type.enum';

@Injectable()
export class ExchangeHandler implements IEventHandler {
  readonly supportedEvents = [
    CommsEventType.EXCHANGE_INITIATED,
    CommsEventType.EXCHANGE_CANCELLED,
  ];

  async handle(context: MessageContext): Promise<void> {
    switch (context.eventType) {
      case CommsEventType.EXCHANGE_INITIATED:
        context.messageKey = 'EXCHANGE_INITIATED';
        return;

      case CommsEventType.EXCHANGE_CANCELLED:
        context.messageKey = 'EXCHANGE_CANCELLED';
        return;

      default:
        throw new BadRequestException(
          `ExchangeHandler does not support event ${context.eventType}`,
        );
    }
  }
}