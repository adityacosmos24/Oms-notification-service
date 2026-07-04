import { Injectable, BadRequestException } from '@nestjs/common';
import { CommunicationChannel } from '../enums/communication-channel.enum';
import { IChannelStrategy } from '../interfaces/channel-strategy.interface';
import { CommunicationService } from '../services/communication.service';
import { MessageContext } from '../types/message-context.type';

@Injectable()
export class EmailStrategy implements IChannelStrategy {
  readonly channel = CommunicationChannel.EMAIL;

  constructor(
    private readonly communicationService: CommunicationService,
  ) {}

  async send(context: MessageContext): Promise<void> {
    if(!context.email) {
        throw new BadRequestException('email is required for EMAIL channel');
    }
    
    if (!context.emailMessage) {
      throw new BadRequestException('emailMessage is missing in message context');
    }

    await this.communicationService.sendEmailNotification({
      userId: context.userId,
      email: context.email,
      message: context.emailMessage,
    });
  }
}