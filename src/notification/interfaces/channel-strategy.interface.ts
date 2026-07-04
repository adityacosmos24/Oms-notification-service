import { CommunicationChannel } from "../enums/communication-channel.enum";
import { MessageContext } from "../types/message-context.type";

export interface IChannelStrategy {
    readonly channel: CommunicationChannel;
    send(context: MessageContext): Promise<void>;
}