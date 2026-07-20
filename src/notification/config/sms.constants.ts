import { SmsMessageType } from './comms.enum';

export const SMS_DEFAULT_BRAND_NAME = 'MyOMS';

/**
 * SMS provider templateId per message type.
 * Full Record so the compiler forces an entry whenever
 * a new SMS message type is added.
 */
export const SMS_TEMPLATE_ID_MAP: Record<SmsMessageType, string> = {
  [SmsMessageType.ORDER_CONFIRM]: 'tmpl_order_confirm',
  [SmsMessageType.ORDER_CONFIRM_QTY_MORE]: 'tmpl_order_confirm_qty_more',

  [SmsMessageType.ORDER_SHIPPED_QTY_1]: 'tmpl_order_shipped_qty_1',
  [SmsMessageType.ORDER_SHIPPED_QTY_2]: 'tmpl_order_shipped_qty_2',
  [SmsMessageType.ORDER_SHIPPED_QTY_3_PLUS]: 'tmpl_order_shipped_qty_3_plus',

  [SmsMessageType.ORDER_DELIVERED_QTY_1]: 'tmpl_order_delivered_qty_1',
  [SmsMessageType.ORDER_DELIVERED_QTY_2]: 'tmpl_order_delivered_qty_2',
  [SmsMessageType.ORDER_DELIVERED_QTY_3_PLUS]:
    'tmpl_order_delivered_qty_3_plus',

  [SmsMessageType.ORDER_DELIVERY_DELAYED_QTY_1]:
    'tmpl_order_delivery_delayed_qty_1',
  [SmsMessageType.ORDER_DELIVERY_DELAYED_QTY_2]:
    'tmpl_order_delivery_delayed_qty_2',
  [SmsMessageType.ORDER_DELIVERY_DELAYED_QTY_3_PLUS]:
    'tmpl_order_delivery_delayed_qty_3_plus',

  [SmsMessageType.ORDER_CANCELLED]: 'tmpl_order_cancelled',
  [SmsMessageType.ORDER_FAILED]: 'tmpl_order_failed',

  [SmsMessageType.RETURN_INITIATED]: 'tmpl_return_initiated',
  [SmsMessageType.RETURN_CANCELLED]: 'tmpl_return_cancelled',

  [SmsMessageType.EXCHANGE_INITIATED]: 'tmpl_exchange_initiated',
  [SmsMessageType.EXCHANGE_CANCELLED]: 'tmpl_exchange_cancelled',

  [SmsMessageType.REFUND_INITIATED]: 'tmpl_refund_initiated',
};
