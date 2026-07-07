import { CommsEventType } from '../enums/comms-event-type.enum';
import { CommunicationChannel } from '../enums/communication-channel.enum';
import { EmailMessageType } from '../config/comms.enum';
import { SmsMessageType } from '../config/comms.enum';


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