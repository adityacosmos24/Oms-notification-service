import { Injectable, BadRequestException } from '@nestjs/common';
import { IEventHandler } from '../interfaces/event-handler.interface';
import { MessageContext } from '../types/message-context.type';
import { CommsEventType } from '../config/comms.enum';
import { HelpersService } from '../services/helpers.service';
import { MessageTypeResolver } from '../resolvers/message-type.resolver';

@Injectable()
export class ReturnHandler implements IEventHandler {
  readonly supportedEvents = [
    CommsEventType.RETURN_INITIATED,
    CommsEventType.RETURN_CANCELLED,
  ];

  constructor(private readonly helpersService: HelpersService) {}

  async handle(context: MessageContext): Promise<void> {
    await this.enrichReturnData(context);

    switch (context.eventType) {
      case CommsEventType.RETURN_INITIATED:
      case CommsEventType.RETURN_CANCELLED:
        context.emailMessageType = MessageTypeResolver.resolveEmailMessageType(
          context.eventType,
        );
        context.smsMessageType =
          MessageTypeResolver.resolveSmsMessageType(context);
        return;

      default:
        throw new BadRequestException(
          `ReturnHandler does not support event ${context.eventType}`,
        );
    }
  }

  private async enrichReturnData(context: MessageContext): Promise<void> {
    const returnDetails = await this.helpersService.getReturnDetails(
      context.orderId,
    );

    if (!returnDetails) return;

    context.additionalData = {
      ...context.additionalData,
      ...returnDetails,
    };
  }
}