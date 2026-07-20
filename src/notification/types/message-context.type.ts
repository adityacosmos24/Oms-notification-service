import {
  CommsEventType,
  EmailMessageType,
  SmsMessageType,
} from '../config/comms.enum';
import { CommunicationChannel } from '../enums/communication-channel.enum';

export interface MessageContext {
  userId: string;
  orderId: string;
  tenantId: string;

  email?: string;
  phone?: string;

  eventType: CommsEventType;
  channels: CommunicationChannel[];

  emailMessageType?: EmailMessageType;
  smsMessageType?: SmsMessageType;

  emailMessage?: string;
  smsMessage?: string;

  additionalData: Record<string, any>;
}
