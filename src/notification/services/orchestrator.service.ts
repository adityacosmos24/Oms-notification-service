import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { MessageProcessor } from '../processors/message.processor';
import { MessageContext } from '../types/message-context.type';
import { TenantConfigService } from './tenant-config.service';

@Injectable()
export class OrchestratorService {
  constructor(
    private readonly messageProcessor: MessageProcessor,
    private readonly tenantConfigService: TenantConfigService,
  ) {}

  async processNotification(
    payload: CreateNotificationDto,
  ): Promise<any> {
    const resolvedChannels =
      payload.channels && payload.channels.length > 0
        ? payload.channels
        : await this.tenantConfigService.resolveChannels(
            payload.tenantId,
            payload.eventType,
          );

    const context: MessageContext = {
      userId: payload.userId,
      orderId: payload.orderId,
      tenantId: payload.tenantId,
      email: payload.email,
      phone: payload.phone,
      eventType: payload.eventType,
      channels: resolvedChannels,
      additionalData: {},
    };

    const processedContext = await this.messageProcessor.process(context);

    return {
      success: true,
      message: 'Notification processed successfully',
      data: {
        eventType: processedContext.eventType,
        channels: processedContext.channels,
        emailMessageType: processedContext.emailMessageType,
        smsMessageType: processedContext.smsMessageType,
        emailMessage: processedContext.emailMessage,
        smsMessage: processedContext.smsMessage,
      },
    };
  }
}