import { Injectable, BadRequestException } from '@nestjs/common';
import { MessageContext } from '../types/message-context.type';
import { SmsMessageType } from '../config/comms.enum';
import { SMS_DEFAULT_BRAND_NAME } from '../config/sms.constants';

type SmsTemplateBuilder = (context: MessageContext) => string;

/**
 * Full Record so the compiler forces a template
 * whenever a new SMS message type is added.
 */
const SMS_TEMPLATES: Record<SmsMessageType, SmsTemplateBuilder> = {
  [SmsMessageType.ORDER_CONFIRM]: (ctx) =>
    `Order ${ctx.orderId} confirmed successfully.`,

  [SmsMessageType.ORDER_CONFIRM_QTY_MORE]: (ctx) =>
    `Order ${ctx.orderId} confirmed successfully for ${itemCount(ctx)} items.`,

  [SmsMessageType.ORDER_SHIPPED_QTY_1]: (ctx) =>
    `Your item from order ${ctx.orderId} has been shipped.`,

  [SmsMessageType.ORDER_SHIPPED_QTY_2]: (ctx) =>
    `2 items from order ${ctx.orderId} have been shipped.`,

  [SmsMessageType.ORDER_SHIPPED_QTY_3_PLUS]: (ctx) =>
    `${itemCount(ctx)} items from order ${ctx.orderId} have been shipped.`,

  [SmsMessageType.ORDER_DELIVERED_QTY_1]: (ctx) =>
    `Your item from order ${ctx.orderId} has been delivered.`,

  [SmsMessageType.ORDER_DELIVERED_QTY_2]: (ctx) =>
    `2 items from order ${ctx.orderId} have been delivered.`,

  [SmsMessageType.ORDER_DELIVERED_QTY_3_PLUS]: (ctx) =>
    `${itemCount(ctx)} items from order ${ctx.orderId} have been delivered.`,

  [SmsMessageType.ORDER_DELIVERY_DELAYED_QTY_1]: (ctx) =>
    `Delivery of your item from order ${ctx.orderId} is delayed.`,

  [SmsMessageType.ORDER_DELIVERY_DELAYED_QTY_2]: (ctx) =>
    `Delivery of 2 items from order ${ctx.orderId} is delayed.`,

  [SmsMessageType.ORDER_DELIVERY_DELAYED_QTY_3_PLUS]: (ctx) =>
    `Delivery of ${itemCount(ctx)} items from order ${ctx.orderId} is delayed.`,

  [SmsMessageType.ORDER_CANCELLED]: (ctx) =>
    `Order ${ctx.orderId} has been cancelled.`,

  [SmsMessageType.ORDER_FAILED]: (ctx) => `Order ${ctx.orderId} failed.`,

  [SmsMessageType.RETURN_INITIATED]: (ctx) =>
    `Return initiated for order ${ctx.orderId}.`,

  [SmsMessageType.RETURN_CANCELLED]: (ctx) =>
    `Return cancelled for order ${ctx.orderId}.`,

  [SmsMessageType.EXCHANGE_INITIATED]: (ctx) =>
    `Exchange initiated for order ${ctx.orderId}.`,

  [SmsMessageType.EXCHANGE_CANCELLED]: (ctx) =>
    `Exchange cancelled for order ${ctx.orderId}.`,

  [SmsMessageType.REFUND_INITIATED]: (ctx) =>
    `Refund of ₹${ctx.additionalData.refundAmount} initiated for order ${ctx.orderId}.`,
};

function itemCount(context: MessageContext): number {
  return Number(context.additionalData.itemCount ?? 1);
}

@Injectable()
export class SmsProcessor {
  process(context: MessageContext): void {
    if (!context.smsMessageType) {
      throw new BadRequestException('smsMessageType is missing in context');
    }

    const buildTemplate = SMS_TEMPLATES[context.smsMessageType];

    if (!buildTemplate) {
      throw new BadRequestException(
        `Unsupported smsMessageType: ${context.smsMessageType}`,
      );
    }

    context.smsMessage = `${buildTemplate(context)} - ${SMS_DEFAULT_BRAND_NAME}`;
  }
}
