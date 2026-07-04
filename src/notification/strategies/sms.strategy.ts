import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { CommunicationChannel } from '../enums/communication-channel.enum';
import { IChannelStrategy } from '../interfaces/channel-strategy.interface';
import { CommunicationService } from '../services/communication.service';
import { MessageContext } from '../types/message-context.type';
import { ContextCreator } from '@nestjs/core/helpers/context-creator';

@Injectable()
export class SmsStrategy implements IChannelStrategy {
  readonly channel = CommunicationChannel.SMS;

  constructor(
    private readonly communicationService: CommunicationService,
  ) {}

  async send(context: MessageContext): Promise<void> {
    await this.communicationService.sendSmsNotification({
      userId: context.userId,
      phone: context.phone!,
      message: context.smsMessage!,
    });
  }
}