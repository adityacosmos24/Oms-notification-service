import { CommsEventType } from '../config/comms.enum';
import { IEventHandler } from '../interfaces/event-handler.interface';
import { MessageTypeResolver } from '../resolvers/message-type.resolver';
import { MessageContext } from '../types/message-context.type';

/**
 * Shared flow for every domain handler:
 * 1. fetch event-specific details and merge them into additionalData
 * 2. fall back to fetched contact info when the payload has none
 * 3. resolve email/SMS message types
 *
 * Concrete handlers only declare supportedEvents and how to fetch details.
 */
export abstract class AbstractEventHandler implements IEventHandler {
  abstract readonly supportedEvents: CommsEventType[];

  constructor(protected readonly messageTypeResolver: MessageTypeResolver) {}

  async handle(context: MessageContext): Promise<void> {
    const details = await this.fetchEventDetails(context);

    if (details) {
      context.additionalData = {
        ...context.additionalData,
        ...details,
      };
    }

    context.email = context.email ?? context.additionalData.email;
    context.phone = context.phone ?? context.additionalData.phone;

    context.emailMessageType = this.messageTypeResolver.resolveEmailMessageType(
      context.eventType,
    );
    context.smsMessageType =
      this.messageTypeResolver.resolveSmsMessageType(context);
  }

  protected abstract fetchEventDetails(
    context: MessageContext,
  ): Promise<Record<string, any> | null>;
}
