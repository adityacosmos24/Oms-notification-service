import { Injectable, BadRequestException } from '@nestjs/common';
import { IEventHandler } from '../interfaces/event-handler.interface';
import { MessageContext } from '../types/message-context.type';
import { CommsEventType } from '../enums/comms-event-type.enum';

@Injectable()
export class RefundHandler implements IEventHandler {
  readonly supportedEvents = [CommsEventType.REFUND_INITIATED];

  async handle(context: MessageContext): Promise<void> {
    switch (context.eventType) {
      case CommsEventType.REFUND_INITIATED:
        context.emailMessage = `Refund initiated for order ${
          context.orderId ?? ''
        }.`;
        context.smsMessage = `Refund initiated for order ${
          context.orderId ?? ''
        }.`;
        return;

      default:
        throw new BadRequestException(
          `RefundHandler does not support event ${context.eventType}`,
        );
    }
  }
}