import { CommsEventType, EmailMessageType, SmsMessageType } from "./comms.enum";

/**
 * Default email message type mapping per event.
 * If an event needs special handling later, handlers/resolvers can override it.
 */

export const DEFAULT_EMAIL_MESSAGE_TYPE_MAP: Partial<Record<CommsEventType, EmailMessageType>>={
    [CommsEventType.ORDER_CONFIRM]: EmailMessageType.ORDER_CONFIRM,
    [CommsEventType.ORDER_SHIPPED]: EmailMessageType.ORDER_SHIPPED,
    [CommsEventType.ORDER_DELIVERED]: EmailMessageType.ORDER_DELIVERED,
    [CommsEventType.ORDER_CANCELLED]: EmailMessageType.ORDER_CANCELLED,
    [CommsEventType.ORDER_FAILED]: EmailMessageType.ORDER_FAILED,

    [CommsEventType.RETURN_INITIATED]: EmailMessageType.RETURN_INITIATED,
    [CommsEventType.RETURN_CANCELLED]: EmailMessageType.RETURN_CANCELLED,

    [CommsEventType.EXCHANGE_INITIATED]: EmailMessageType.EXCHANGE_INITIATED,
    [CommsEventType.EXCHANGE_CANCELLED]: EmailMessageType.EXCHANGE_CANCELLED,

    [CommsEventType.REFUND_INITIATED]: EmailMessageType.REFUND_INITIATED,
}

/**
 * Default SMS message type mapping per event.
 * For events with dynamic variants (qty/refund mode/etc.), this acts as a fallback.
 */

export const DEFAULT_SMS_MESSAGE_TYPE_MAP: Partial<
  Record<CommsEventType, SmsMessageType>
> = {
  [CommsEventType.ORDER_CONFIRM]: SmsMessageType.ORDER_CONFIRM,
  [CommsEventType.ORDER_SHIPPED]: SmsMessageType.ORDER_SHIPPED,
  [CommsEventType.ORDER_DELIVERED]: SmsMessageType.ORDER_DELIVERED,
  [CommsEventType.ORDER_CANCELLED]: SmsMessageType.ORDER_CANCELLED,
  [CommsEventType.ORDER_FAILED]: SmsMessageType.ORDER_FAILED,

  [CommsEventType.RETURN_INITIATED]: SmsMessageType.RETURN_INITIATED,
  [CommsEventType.RETURN_CANCELLED]: SmsMessageType.RETURN_CANCELLED,

  [CommsEventType.EXCHANGE_INITIATED]: SmsMessageType.EXCHANGE_INITIATED,
  [CommsEventType.EXCHANGE_CANCELLED]: SmsMessageType.EXCHANGE_CANCELLED,

  [CommsEventType.REFUND_INITIATED]: SmsMessageType.REFUND_INITIATED,
};