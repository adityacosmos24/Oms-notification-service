import { CommunicationChannel } from "../enums/communication-channel.enum";
import { CommsEventType, EmailMessageType, SmsMessageType, } from '../config/comms.enum';

export type MessageContext = {
    userId: string;
    orderId?:  string;
    parentOrderId?: string;
    email?: string;
    phone?: string;

    eventType: CommsEventType;
    channels: CommunicationChannel[];
    additionalData: Record<string, any>;

    // Set by handlers
    emailMessageType?: EmailMessageType;
    smsMessageType?: SmsMessageType;

    // Set by processors
    emailMessage?: string;
    smsMessage?: string;
}