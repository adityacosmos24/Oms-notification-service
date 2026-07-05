import { CommsEventType, EmailMessageType, SmsMessageType } from "../config/comms.enum";
import { DEFAULT_EMAIL_MESSAGE_TYPE_MAP, DEFAULT_SMS_MESSAGE_TYPE_MAP } from "../config/comms.constants";
import { MessageContext } from "../types/message-context.type";

export class MessageTypeResolver {
  static resolveEmailMessageType(
    eventType: CommsEventType,
  ): EmailMessageType | undefined {
    return DEFAULT_EMAIL_MESSAGE_TYPE_MAP[eventType];
  }

  static resolveSmsMessageType(
    context: MessageContext,
  ): SmsMessageType | undefined {
    switch (context.eventType) {
      case CommsEventType.ORDER_CONFIRM:
        return this.resolveOrderConfirmSmsType(context);

      case CommsEventType.ORDER_SHIPPED:
        return this.resolveOrderShippedSmsType(context);

      default:
        return DEFAULT_SMS_MESSAGE_TYPE_MAP[context.eventType];
    }
  }

  private static resolveOrderConfirmSmsType(
    context: MessageContext,
  ): SmsMessageType {
    const itemCount = context.additionalData.itemCount ?? 1;

    if (itemCount > 1) {
      return SmsMessageType.ORDER_CONFIRM_QTY_MORE;
    }

    return SmsMessageType.ORDER_CONFIRM;
  }

  private static resolveOrderShippedSmsType(
    context: MessageContext,
  ): SmsMessageType {
    const itemCount = context.additionalData.itemCount ?? 1;

    if (itemCount === 2) {
      return SmsMessageType.ORDER_SHIPPED_QTY_2;
    }

    return SmsMessageType.ORDER_SHIPPED;
  }
}