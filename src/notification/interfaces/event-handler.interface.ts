import { MessageContext } from "../types/message-context.type";
import { CommsEventType } from "../enums/comms-event-type.enum";

export interface IEventHandler {
    readonly supportedEvents: CommsEventType[];
    handle(context: MessageContext): Promise<void>;
}