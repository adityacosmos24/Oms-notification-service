import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CommsEventType,
  EmailMessageType,
  SmsMessageType,
} from '../config/comms.enum';
import {
  DEFAULT_EMAIL_MESSAGE_TYPE_MAP,
  DEFAULT_SMS_MESSAGE_TYPE_MAP,
  SMS_QTY_VARIANT_MESSAGE_TYPE_MAP,
} from '../config/comms.constants';
import { MessageContext } from '../types/message-context.type';
import { getItemCountBucket } from '../utils/item-count.util';

@Injectable()
export class MessageTypeResolver {
  resolveEmailMessageType(eventType: CommsEventType): EmailMessageType {
    return DEFAULT_EMAIL_MESSAGE_TYPE_MAP[eventType];
  }

  resolveSmsMessageType(context: MessageContext): SmsMessageType {
    const { eventType } = context;
    const itemCount = Number(context.additionalData?.itemCount || 1);

    if (eventType === CommsEventType.ORDER_CONFIRM) {
      return itemCount > 1
        ? SmsMessageType.ORDER_CONFIRM_QTY_MORE
        : SmsMessageType.ORDER_CONFIRM;
    }

    const qtyVariants = SMS_QTY_VARIANT_MESSAGE_TYPE_MAP[eventType];
    if (qtyVariants) {
      return qtyVariants[getItemCountBucket(itemCount)];
    }

    const smsMessageType = DEFAULT_SMS_MESSAGE_TYPE_MAP[eventType];
    if (!smsMessageType) {
      throw new BadRequestException(
        `No SMS message type mapped for event ${eventType}`,
      );
    }

    return smsMessageType;
  }
}
