import { Injectable, BadRequestException } from '@nestjs/common';
import { IEventHandler } from '../interfaces/event-handler.interface';
import { MessageContext } from '../types/message-context.type';
import { CommsEventType } from '../config/comms.enum';
import { HelpersService } from '../services/helpers.service';
import { MessageTypeResolver } from '../resolvers/message-type.resolver';

@Injectable()
export class RefundHandler implements IEventHandler {
  readonly supportedEvents = [CommsEventType.REFUND_INITIATED];

  constructor(private readonly helpersService: HelpersService) {}

  async handle(context: MessageContext): Promise<void> {
    await this.enrichRefundData(context);

    switch (context.eventType) {
      case CommsEventType.REFUND_INITIATED:
        context.emailMessageType = MessageTypeResolver.resolveEmailMessageType(
          context.eventType,
        );
        context.smsMessageType =
          MessageTypeResolver.resolveSmsMessageType(context);
        return;

      default:
        throw new BadRequestException(
          `RefundHandler does not support event ${context.eventType}`,
        );
    }
  }

  private async enrichRefundData(context: MessageContext): Promise<void> {
    const refundDetails = await this.helpersService.getRefundDetails(
      context.orderId,
    );

    if (!refundDetails) return;

    context.additionalData = {
      ...context.additionalData,
      ...refundDetails,
    };
  }
}