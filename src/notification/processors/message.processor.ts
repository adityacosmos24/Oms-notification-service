import { Injectable, BadRequestException } from '@nestjs/common';
import { MessageContext } from '../types/message-context.type';
import { BaseHandler } from '../handlers/base.handler';
import { EmailProcessor } from './email.processor';
import { SmsProcessor } from './sms.processor';
import { ChannelStrategyFactory } from '../factories/channel-strategy.factory';
import { CommunicationChannel } from '../enums/communication-channel.enum';

@Injectable()
export class MessageProcessor {
  constructor(
    private readonly baseHandler: BaseHandler,
    private readonly emailProcessor: EmailProcessor,
    private readonly smsProcessor: SmsProcessor,
    private readonly channelStrategyFactory: ChannelStrategyFactory,
  ) {}

  async process(context: MessageContext): Promise<void> {
    this.validateContext(context);

    // Step 1: domain handler decides logical message key
    await this.baseHandler.process(context);

    // Step 2: build channel-specific message payloads
    this.buildMessages(context);

    // Step 3: send through selected channels
    await this.sendThroughChannels(context);
  }

  private validateContext(context: MessageContext) {
    if (!context.userId) {
      throw new BadRequestException('userId is required');
    }

    if (!context.eventType) {
      throw new BadRequestException('eventType is required');
    }

    if (!context.channels || context.channels.length === 0) {
      throw new BadRequestException('At least one channel is required');
    }
  }

  private buildMessages(context: MessageContext) {
    if (context.channels.includes(CommunicationChannel.EMAIL)) {
      this.emailProcessor.process(context);
    }

    if (context.channels.includes(CommunicationChannel.SMS)) {
      this.smsProcessor.process(context);
    }
  }

  private async sendThroughChannels(context: MessageContext) {
    for (const channel of context.channels) {
      const strategy = this.channelStrategyFactory.getStrategy(channel);
      await strategy.send(context);
    }
  }
}