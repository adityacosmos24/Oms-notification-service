import { Injectable } from '@nestjs/common';
import { CommunicationChannel } from '../enums/communication-channel.enum';
import { IChannelStrategy } from '../interfaces/channel-strategy.interface';
import { CommunicationService } from '../services/communication.service';
import { MessageContext } from '../types/message-context.type';

@Injectable()
export class EmailStrategy implements IChannelStrategy {
  readonly channel = CommunicationChannel.EMAIL;

  constructor(private readonly communicationService: CommunicationService) {}

  async send(context: MessageContext): Promise<void> {
    await this.communicationService.sendEmailNotification({
      userId: context.userId,
      email: context.email!,
      message: context.emailMessage!,
    });
  }
}
