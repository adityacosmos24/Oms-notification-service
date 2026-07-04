import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { MessageContext } from '../types/message-context.type';
import { BaseHandler } from '../handlers/base.handler';
import { EmailProcessor } from './email.processor';
import { SmsProcessor } from './sms.processor';
import { ChannelStrategyFactory } from '../factories/channel-strategy.factory';
import { CommunicationChannel } from '../enums/communication-channel.enum';
import { send } from 'process';

@Injectable()
export class MessageProcessor {
    private readonly logger = new Logger(MessageProcessor.name);


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

  private async sendThroughChannels(context: MessageContext): Promise<void> {
    const sendTask: Promise<void>[] = [];

    if(this.canSendEmail(context)) {
        const emailStrategy = this.channelStrategyFactory.getStrategy(
            CommunicationChannel.EMAIL,
        );

        sendTask.push(emailStrategy.send(context));
    }
    else if(context.channels.includes(CommunicationChannel.EMAIL)) {
        this.logger.debug(
            `Skipping EMAIL for user ${context.userId} because recipient or message is missing`,
        );
    }

    if(this.canSendSms(context)) {
        const smsStrategy = this.channelStrategyFactory.getStrategy(
            CommunicationChannel.SMS,
        );

        sendTask.push(smsStrategy.send(context));
    }
    else if(context.channels.includes(CommunicationChannel.SMS)) {
        this.logger.debug(
            `Skipping SMS for user ${context.userId} because recipient or message is missing`,
        );
    }

    const results = await Promise.allSettled(sendTask);

    results.forEach((result, index)=> {
        if(result.status === 'rejected') {
            this.logger.error(
                `Channel send task ${index} failed: ${result.reason}`,
            );
        }
    });
  }
  
  private canSendEmail(context: MessageContext): boolean {
    return !!context.email && !! context.emailMessage;
  }
  
  private canSendSms(context: MessageContext): boolean {
    return !!context.email && !!context.smsMessage;
  }
}