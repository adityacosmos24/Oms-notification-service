import { Injectable } from '@nestjs/common';
import { SMS_TEMPLATE_ID_MAP } from '../config/sms.constants';
import { CommunicationChannel } from '../enums/communication-channel.enum';
import { IChannelStrategy } from '../interfaces/channel-strategy.interface';
import { CommunicationService } from '../services/communication.service';
import { MessageContext } from '../types/message-context.type';

@Injectable()
export class SmsStrategy implements IChannelStrategy {
  readonly channel = CommunicationChannel.SMS;

  constructor(private readonly communicationService: CommunicationService) {}

  async send(context: MessageContext): Promise<void> {
    await this.communicationService.sendSmsNotification({
      userId: context.userId,
      phone: context.phone!,
      message: context.smsMessage!,
      templateId: context.smsMessageType
        ? SMS_TEMPLATE_ID_MAP[context.smsMessageType]
        : undefined,
    });
  }
}
