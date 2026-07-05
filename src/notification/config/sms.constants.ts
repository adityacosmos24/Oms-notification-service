import { SmsMessageType } from './comms.enum';

export const SMS_DEFAULT_BRAND_NAME = 'MyOMS';

/**
 * SMS templateId mapping.
 * In real OMS this would map to actual provider template IDs.
 */
export const SMS_TEMPLATE_ID_MAP: Partial<Record<SmsMessageType, string>> = {
  [SmsMessageType.ORDER_CONFIRM]: 'tmpl_order_confirm',
  [SmsMessageType.ORDER_CONFIRM_QTY_MORE]: 'tmpl_order_confirm_qty_more',

  [SmsMessageType.ORDER_SHIPPED]: 'tmpl_order_shipped',
  [SmsMessageType.ORDER_SHIPPED_QTY_2]: 'tmpl_order_shipped_qty_2',

  [SmsMessageType.ORDER_DELIVERED]: 'tmpl_order_delivered',
  [SmsMessageType.ORDER_CANCELLED]: 'tmpl_order_cancelled',
  [SmsMessageType.ORDER_FAILED]: 'tmpl_order_failed',

  [SmsMessageType.RETURN_INITIATED]: 'tmpl_return_initiated',
  [SmsMessageType.RETURN_CANCELLED]: 'tmpl_return_cancelled',

  [SmsMessageType.EXCHANGE_INITIATED]: 'tmpl_exchange_initiated',
  [SmsMessageType.EXCHANGE_CANCELLED]: 'tmpl_exchange_cancelled',

  [SmsMessageType.REFUND_INITIATED]: 'tmpl_refund_initiated',
};