import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { MessageContext } from './types/message-context.type';
import { MessageProcessor } from './processors/message.processor';

@Injectable()
export class NotificationService {
  constructor(
    private readonly messageProcessor: MessageProcessor,
  ) {}

  async sendNotification(createNotificationDto: CreateNotificationDto) {
    const context = this.buildMessageContext(createNotificationDto);

    await this.messageProcessor.process(context);

    return {
        success: true,
        message: 'Notification processed successfully',
        data: {
            eventType: context.eventType,
            messageKey: context.messageKey,
            channels: context.channels,
            emailMessage: context.emailMessage ?? null,
            smsMessage: context.smsMessage ?? null,
        },
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