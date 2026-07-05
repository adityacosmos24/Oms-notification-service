import { Injectable, BadRequestException } from '@nestjs/common';
import { IEventHandler } from '../interfaces/event-handler.interface';
import { MessageContext } from '../types/message-context.type';
import { CommsEventType } from '../enums/comms-event-type.enum';

@Injectable()
export class ReturnHandler implements IEventHandler {
  readonly supportedEvents = [
    CommsEventType.RETURN_INITIATED,
    CommsEventType.RETURN_CANCELLED,
  ];

  async handle(context: MessageContext): Promise<void> {
    switch (context.eventType) {
      case CommsEventType.RETURN_INITIATED:
        context.messageKey = 'RETURN_INITIATED';
        return;

      case CommsEventType.RETURN_CANCELLED:
        context.messageKey = 'RETURN_CANCELLED';
        return;

      default:
        throw new BadRequestException(
          `ReturnHandler does not support event ${context.eventType}`,
        );
    }
  }
}