import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ChannelStrategyFactory } from './factories/channel-strategy.factory';
import { MessageContext } from './types/message-context.type';
import { BaseHandler } from './handlers/base.handler';

@Injectable()
export class NotificationService {
  constructor(
    private readonly channelStrategyFactory: ChannelStrategyFactory,
    private readonly baseHandler: BaseHandler,
  ) {}

  async sendNotification(createNotificationDto: CreateNotificationDto) {
    const context = this.buildMessageContext(createNotificationDto);

    await this.baseHandler.process(context);

    for (const channel of context.channels) {
      const strategy = this.channelStrategyFactory.getStrategy(channel);
      await strategy.send(context);
    }

    return {
      success: true,
      message: 'Notification processed successfully',
      eventType: context.eventType,
    };
  }

  private buildMessageContext(dto: CreateNotificationDto): MessageContext {
    return {
      userId: dto.userId,
      orderId: dto.orderId,
      parentOrderId: dto.parentOrderId,
      email: dto.email,
      phone: dto.phone,
      eventType: dto.eventType,
      channels: dto.channels,
      additionalData: dto.additionalData ?? {},
    };
  }
}