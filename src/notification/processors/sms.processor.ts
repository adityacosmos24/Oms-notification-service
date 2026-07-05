import { Injectable, BadRequestException } from '@nestjs/common';
import { MessageContext } from '../types/message-context.type';
import { SmsMessageType } from '../config/comms.enum';

@Injectable()
export class SmsProcessor {
  process(context: MessageContext): void {
    if (!context.smsMessageType) {
      throw new BadRequestException('smsMessageType is missing in context');
    }

    const orderId = context.orderId ?? '';
    const refundAmount = context.additionalData.refundAmount;
    const itemCount = context.additionalData.itemCount ?? 1;
// Later this smsMessageType will also map to provider templateId via SMS_TEMPLATE_ID_MAP
    switch (context.smsMessageType) {
      case SmsMessageType.ORDER_CONFIRM:
        context.smsMessage = `Order ${orderId} confirmed successfully.`;
        return;

      case SmsMessageType.ORDER_CONFIRM_QTY_MORE:
        context.smsMessage = `Order ${orderId} confirmed successfully for ${itemCount} items.`;
        return;

      case SmsMessageType.ORDER_SHIPPED:
        context.smsMessage = `Order ${orderId} shipped successfully.`;
        return;

      case SmsMessageType.ORDER_SHIPPED_QTY_2:
        context.smsMessage = `2 items from order ${orderId} have been shipped.`;
        return;

      case SmsMessageType.ORDER_DELIVERED:
        context.smsMessage = `Order ${orderId} delivered successfully.`;
        return;

      case SmsMessageType.ORDER_CANCELLED:
        context.smsMessage = `Order ${orderId} has been cancelled.`;
        return;

      case SmsMessageType.ORDER_FAILED:
        context.smsMessage = `Order ${orderId} failed.`;
        return;

      case SmsMessageType.RETURN_INITIATED:
        context.smsMessage = `Return initiated for order ${orderId}.`;
        return;

      case SmsMessageType.RETURN_CANCELLED:
        context.smsMessage = `Return cancelled for order ${orderId}.`;
        return;

      case SmsMessageType.EXCHANGE_INITIATED:
        context.smsMessage = `Exchange initiated for order ${orderId}.`;
        return;

      case SmsMessageType.EXCHANGE_CANCELLED:
        context.smsMessage = `Exchange cancelled for order ${orderId}.`;
        return;

      case SmsMessageType.REFUND_INITIATED:
        context.smsMessage = `Refund of ₹${refundAmount} initiated for order ${orderId}.`;
        return;

      default:
        throw new BadRequestException(
          `Unsupported smsMessageType: ${context.smsMessageType}`,
        );
    }
  }
}