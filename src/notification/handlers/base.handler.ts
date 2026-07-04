import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderHandler } from './order.handler';
import { ExchangeHandler } from './exchange.handler';
import { RefundHandler } from './refund.handler';
import { ReturnHandler } from './return.handler';
import { MessageContext } from '../types/message-context.type';
import { IEventHandler } from '../interfaces/event-handler.interface';
import { CommsEventType } from '../enums/comms-event-type.enum';

@Injectable()
export class BaseHandler {
    private readonly eventHandlerMap: Map<CommsEventType, IEventHandler>;

    constructor(
        private readonly orderHandler: OrderHandler,
        private readonly exchangeHandler: ExchangeHandler,
        private readonly returnHandler: ReturnHandler,
        private readonly refundHandler: RefundHandler
    ){
        this.eventHandlerMap = new Map<CommsEventType, IEventHandler>();

        this.registerHandler(this.orderHandler);
        this.registerHandler(this.returnHandler);
        this.registerHandler(this.exchangeHandler);
        this.registerHandler(this.refundHandler);
    }

    private registerHandler(handler: IEventHandler) {
        for (const eventType of handler.supportedEvents) {
            this.eventHandlerMap.set(eventType, handler);
        }
    }

    async process(context: MessageContext): Promise<void> {
        const handler = this.eventHandlerMap.get(context.eventType);

        if(!handler) {
            throw new BadRequestException(
                `No handler registered for event type ${context.eventType}`,
            );
        }

        await handler.handle(context);
    }
}