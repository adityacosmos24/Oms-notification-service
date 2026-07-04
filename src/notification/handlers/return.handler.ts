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
        context.emailMessage = `Return initiated for order ${
          context.orderId ?? ''
        }.`;
        context.smsMessage = `Return initiated for order ${
          context.orderId ?? ''
        }.`;
        return;

      case CommsEventType.RETURN_CANCELLED:
        context.emailMessage = `Return cancelled for order ${
          context.orderId ?? ''
        }.`;
        context.smsMessage = `Return cancelled for order ${
          context.orderId ?? ''
        }.`;
        return;

      default:
        throw new BadRequestException(
          `ReturnHandler does not support event ${context.eventType}`,
        );
    }
  }
}