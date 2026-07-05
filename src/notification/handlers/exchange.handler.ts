import { Injectable, BadRequestException } from '@nestjs/common';
import { IEventHandler } from '../interfaces/event-handler.interface';
import { MessageContext } from '../types/message-context.type';
import { CommsEventType } from '../enums/comms-event-type.enum';
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