import { Injectable } from '@nestjs/common';
import { CommsEventType } from '../config/comms.enum';
import { HelpersService } from '../services/helpers.service';
import { MessageTypeResolver } from '../resolvers/message-type.resolver';
import { MessageContext } from '../types/message-context.type';
import { AbstractEventHandler } from './abstract-event.handler';

@Injectable()
export class RefundHandler extends AbstractEventHandler {
  readonly supportedEvents = [CommsEventType.REFUND_INITIATED];

  constructor(
    messageTypeResolver: MessageTypeResolver,
    private readonly helpersService: HelpersService,
  ) {
    super(messageTypeResolver);
  }

  protected fetchEventDetails(context: MessageContext) {
    return this.helpersService.getRefundDetails(context.orderId);
  }
}
