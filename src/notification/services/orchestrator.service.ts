import { Injectable } from "@nestjs/common";
import { MessageProcessor } from "../processors/message.processor";
import { CreateNotificationDto } from "../dto/create-notification.dto";
import { MessageContext } from "../types/message-context.type";

@Injectable()
export class OrchestratorService {
    constructor(
        private readonly messageProcessor: MessageProcessor,
    ) {}

    async processNotification(payload: CreateNotificationDto) {
    const context = this.buildMessageContext(payload);

    await this.messageProcessor.process(context);

        return {
            success: true,
            message: 'Notification processed successfully',
            data: {
            eventType: context.eventType,
            emailMessageType: context.emailMessageType ?? null,
            smsMessageType: context.smsMessageType ?? null,
            channels: context.channels,
            emailMessage: context.emailMessage ?? null,
            smsMessage: context.smsMessage ?? null,
            },
        };
    }

    private buildMessageContext(payload: CreateNotificationDto): MessageContext {
        return {
            userId: payload.userId,
            orderId: payload.orderId,
            parentOrderId: payload.parentOrderId,
            email: payload.email,
            phone: payload.phone,
            eventType: payload.eventType,
            channels: payload.channels,
            additionalData: payload.additionalData ?? {},
        };
    }
}