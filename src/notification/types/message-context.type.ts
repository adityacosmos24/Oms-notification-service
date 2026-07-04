import { CommunicationChannel } from "../enums/communication-channel.enum";
import { CommsEventType } from "../enums/comms-event-type.enum";

export type MessageContext = {
    userId: string;
    orderId?:  string;
    parentOrderId?: string;
    email?: string;
    phone?: string;
    eventType: CommsEventType;
    channels: CommunicationChannel[];
    additionalData: Record<string, any>;

    emailMessage?: string;
    smsMessage?: string;
}