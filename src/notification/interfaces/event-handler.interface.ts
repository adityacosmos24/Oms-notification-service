import { MessageContext } from "../types/message-context.type";
import { CommsEventType, EmailMessageType, SmsMessageType, } from '../config/comms.enum';

export interface IEventHandler {
    readonly supportedEvents: CommsEventType[];
    handle(context: MessageContext): Promise<void>;
}