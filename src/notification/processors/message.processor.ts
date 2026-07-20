import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { MessageContext } from '../types/message-context.type';
import { BaseHandler } from '../handlers/base.handler';
import { EmailProcessor } from './email.processor';
import { SmsProcessor } from './sms.processor';
import { ChannelStrategyFactory } from '../factories/channel-strategy.factory';
import { CommunicationChannel } from '../enums/communication-channel.enum';

@Injectable()
export class MessageProcessor {
  private readonly logger = new Logger(MessageProcessor.name);

  constructor(
    private readonly baseHandler: BaseHandler,
    private readonly emailProcessor: EmailProcessor,
    private readonly smsProcessor: SmsProcessor,
    private readonly channelStrategyFactory: ChannelStrategyFactory,
  ) {}

  async process(context: MessageContext): Promise<MessageContext> {
    this.validateContext(context);

    // Step 1: domain handler enriches data and resolves message types
    await this.baseHandler.process(context);

    // Step 2: build channel-specific message payloads
    this.buildMessages(context);

    // Step 3: send through selected channels
    await this.sendThroughChannels(context);

    return context;
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

  private async sendThroughChannels(context: MessageContext): Promise<void> {
    const sendTasks: Promise<void>[] = [];

    for (const channel of context.channels) {
      if (!this.canSend(channel, context)) {
        this.logger.debug(
          `Skipping ${channel} for user ${context.userId} because recipient or message is missing`,
        );
        continue;
      }

      const strategy = this.channelStrategyFactory.getStrategy(channel);
      sendTasks.push(strategy.send(context));
    }

    const results = await Promise.allSettled(sendTasks);

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        this.logger.error(`Channel send task ${index} failed: ${result.reason}`);
      }
    });
  }

  private canSend(
    channel: CommunicationChannel,
    context: MessageContext,
  ): boolean {
    switch (channel) {
      case CommunicationChannel.EMAIL:
        return !!context.email && !!context.emailMessage;
      case CommunicationChannel.SMS:
        return !!context.phone && !!context.smsMessage;
      default:
        return false;
    }
  }
}
