import { Injectable, BadRequestException } from '@nestjs/common';
import { MessageContext } from '../types/message-context.type';
import { EmailMessageType } from '../config/comms.enum';

type EmailTemplateBuilder = (context: MessageContext) => string;

/**
 * Full Record so the compiler forces a template
 * whenever a new email message type is added.
 */
const EMAIL_TEMPLATES: Record<EmailMessageType, EmailTemplateBuilder> = {
  [EmailMessageType.ORDER_CONFIRM]: (ctx) =>
    `Hi ${customerName(ctx)}, your order ${ctx.orderId} has been confirmed. Total amount: ₹${ctx.additionalData.orderAmount}. Items: ${ctx.additionalData.itemCount}.`,

  [EmailMessageType.ORDER_SHIPPED]: (ctx) =>
    `Hi ${customerName(ctx)}, your order ${ctx.orderId} has been shipped.`,

  [EmailMessageType.ORDER_DELIVERED]: (ctx) =>
    `Hi ${customerName(ctx)}, your order ${ctx.orderId} has been delivered.`,

  [EmailMessageType.ORDER_DELIVERY_DELAYED]: (ctx) =>
    `Hi ${customerName(ctx)}, delivery of your order ${ctx.orderId} has been delayed. We are sorry for the inconvenience.`,

  [EmailMessageType.ORDER_CANCELLED]: (ctx) =>
    `Hi ${customerName(ctx)}, your order ${ctx.orderId} has been cancelled.`,

  [EmailMessageType.ORDER_FAILED]: (ctx) =>
    `Hi ${customerName(ctx)}, your order ${ctx.orderId} has failed.`,

  [EmailMessageType.RETURN_INITIATED]: (ctx) =>
    `Hi ${customerName(ctx)}, return has been initiated for order ${ctx.orderId}.`,

  [EmailMessageType.RETURN_CANCELLED]: (ctx) =>
    `Hi ${customerName(ctx)}, return has been cancelled for order ${ctx.orderId}.`,

  [EmailMessageType.EXCHANGE_INITIATED]: (ctx) =>
    `Hi ${customerName(ctx)}, exchange has been initiated for order ${ctx.orderId}.`,

  [EmailMessageType.EXCHANGE_CANCELLED]: (ctx) =>
    `Hi ${customerName(ctx)}, exchange has been cancelled for order ${ctx.orderId}.`,

  [EmailMessageType.REFUND_INITIATED]: (ctx) =>
    `Hi ${customerName(ctx)}, refund of ₹${ctx.additionalData.refundAmount} has been initiated for order ${ctx.orderId} via ${ctx.additionalData.refundMode}.`,
};

function customerName(context: MessageContext): string {
  return context.additionalData.customerName ?? 'Customer';
}

@Injectable()
export class EmailProcessor {
  process(context: MessageContext): void {
    if (!context.emailMessageType) {
      throw new BadRequestException('emailMessageType is missing in context');
    }

    const buildTemplate = EMAIL_TEMPLATES[context.emailMessageType];

    if (!buildTemplate) {
      throw new BadRequestException(
        `Unsupported emailMessageType: ${context.emailMessageType}`,
      );
    }

    context.emailMessage = buildTemplate(context);
  }
}
