import { Injectable, BadRequestException } from '@nestjs/common';
import { IEventHandler } from '../interfaces/event-handler.interface';
import { MessageContext } from '../types/message-context.type';
import { CommsEventType } from '../config/comms.enum';
import { HelpersService } from '../services/helpers.service';
import { MessageTypeResolver } from '../resolvers/message-type.resolver';

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
      case CommsEventType.EXCHANGE_CANCELLED:
        context.emailMessageType = MessageTypeResolver.resolveEmailMessageType(
          context.eventType,
        );
        context.smsMessageType =
          MessageTypeResolver.resolveSmsMessageType(context);
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