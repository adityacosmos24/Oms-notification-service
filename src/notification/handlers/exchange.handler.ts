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
export class ExchangeHandler implements IEventHandler {
  readonly supportedEvents = [
    CommsEventType.EXCHANGE_INITIATED,
    CommsEventType.EXCHANGE_CANCELLED,
  ];

  constructor(private readonly helpersService: HelpersService) {}

  async handle(context: MessageContext): Promise<void> {
    await this.enrichExchangeData(context);

    switch (context.eventType) {
      case CommsEventType.EXCHANGE_INITIATED:
        context.emailMessageType = EmailMessageType.EXCHANGE_INITIATED;
        context.smsMessageType = SmsMessageType.EXCHANGE_INITIATED;
        return;

      case CommsEventType.EXCHANGE_CANCELLED:
        context.emailMessageType = EmailMessageType.EXCHANGE_CANCELLED;
        context.smsMessageType = SmsMessageType.EXCHANGE_CANCELLED;
        return;

      default:
        throw new BadRequestException(
          `ExchangeHandler does not support event ${context.eventType}`,
        );
    }
  }

  private async enrichExchangeData(context: MessageContext): Promise<void> {
    const exchangeDetails = await this.helpersService.getExchangeDetails(
      context.orderId,
    );

    if (!exchangeDetails) return;

    context.additionalData = {
      ...context.additionalData,
      ...exchangeDetails,
    };
  }
}