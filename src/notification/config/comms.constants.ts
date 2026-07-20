import { CommsEventType, EmailMessageType, SmsMessageType } from './comms.enum';
import { ItemCountBucket } from '../utils/item-count.util';

/**
 * Email message type mapping per event (1:1 today).
 * Used by MessageTypeResolver; full Record so the compiler
 * forces an entry whenever a new event type is added.
 */
export const DEFAULT_EMAIL_MESSAGE_TYPE_MAP: Record<
  CommsEventType,
  EmailMessageType
> = {
  [CommsEventType.ORDER_CONFIRM]: EmailMessageType.ORDER_CONFIRM,
  [CommsEventType.ORDER_SHIPPED]: EmailMessageType.ORDER_SHIPPED,
  [CommsEventType.ORDER_DELIVERED]: EmailMessageType.ORDER_DELIVERED,
  [CommsEventType.ORDER_DELIVERY_DELAYED]:
    EmailMessageType.ORDER_DELIVERY_DELAYED,
  [CommsEventType.ORDER_CANCELLED]: EmailMessageType.ORDER_CANCELLED,
  [CommsEventType.ORDER_FAILED]: EmailMessageType.ORDER_FAILED,

  [CommsEventType.RETURN_INITIATED]: EmailMessageType.RETURN_INITIATED,
  [CommsEventType.RETURN_CANCELLED]: EmailMessageType.RETURN_CANCELLED,

  [CommsEventType.EXCHANGE_INITIATED]: EmailMessageType.EXCHANGE_INITIATED,
  [CommsEventType.EXCHANGE_CANCELLED]: EmailMessageType.EXCHANGE_CANCELLED,

  [CommsEventType.REFUND_INITIATED]: EmailMessageType.REFUND_INITIATED,
};

/**
 * SMS message type mapping for events that do NOT vary by item count.
 * Events with qty variants (shipped/delivered/delayed) are resolved
 * via SMS_QTY_VARIANT_MESSAGE_TYPE_MAP instead.
 */
export const DEFAULT_SMS_MESSAGE_TYPE_MAP: Partial<
  Record<CommsEventType, SmsMessageType>
> = {
  [CommsEventType.ORDER_CONFIRM]: SmsMessageType.ORDER_CONFIRM,
  [CommsEventType.ORDER_CANCELLED]: SmsMessageType.ORDER_CANCELLED,
  [CommsEventType.ORDER_FAILED]: SmsMessageType.ORDER_FAILED,

  [CommsEventType.RETURN_INITIATED]: SmsMessageType.RETURN_INITIATED,
  [CommsEventType.RETURN_CANCELLED]: SmsMessageType.RETURN_CANCELLED,

  [CommsEventType.EXCHANGE_INITIATED]: SmsMessageType.EXCHANGE_INITIATED,
  [CommsEventType.EXCHANGE_CANCELLED]: SmsMessageType.EXCHANGE_CANCELLED,

  [CommsEventType.REFUND_INITIATED]: SmsMessageType.REFUND_INITIATED,
};

/**
 * SMS message type variants by item-count bucket,
 * for events whose SMS copy depends on quantity.
 */
export const SMS_QTY_VARIANT_MESSAGE_TYPE_MAP: Partial<
  Record<CommsEventType, Record<ItemCountBucket, SmsMessageType>>
> = {
  [CommsEventType.ORDER_SHIPPED]: {
    [ItemCountBucket.QTY_1]: SmsMessageType.ORDER_SHIPPED_QTY_1,
    [ItemCountBucket.QTY_2]: SmsMessageType.ORDER_SHIPPED_QTY_2,
    [ItemCountBucket.QTY_3_PLUS]: SmsMessageType.ORDER_SHIPPED_QTY_3_PLUS,
  },
  [CommsEventType.ORDER_DELIVERED]: {
    [ItemCountBucket.QTY_1]: SmsMessageType.ORDER_DELIVERED_QTY_1,
    [ItemCountBucket.QTY_2]: SmsMessageType.ORDER_DELIVERED_QTY_2,
    [ItemCountBucket.QTY_3_PLUS]: SmsMessageType.ORDER_DELIVERED_QTY_3_PLUS,
  },
  [CommsEventType.ORDER_DELIVERY_DELAYED]: {
    [ItemCountBucket.QTY_1]: SmsMessageType.ORDER_DELIVERY_DELAYED_QTY_1,
    [ItemCountBucket.QTY_2]: SmsMessageType.ORDER_DELIVERY_DELAYED_QTY_2,
    [ItemCountBucket.QTY_3_PLUS]:
      SmsMessageType.ORDER_DELIVERY_DELAYED_QTY_3_PLUS,
  },
};

export const COMMS_CONFIG_KEYS = {
  CHANNEL_CONFIG: 'COMMS_CHANNEL_CONFIG',
};
