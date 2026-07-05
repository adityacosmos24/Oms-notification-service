import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { EmailStrategy } from './strategies/email.strategy';
import { SmsStrategy } from './strategies/sms.strategy';
import { ChannelStrategyFactory } from './factories/channel-strategy.factory';
import { CommunicationService } from './services/communication.service';
import { OrchestratorService } from './services/orchestrator.service';
import { HelpersService } from './services/helpers.service';
import { BaseHandler } from './handlers/base.handler';
import { OrderHandler } from './handlers/order.handler';
import { ReturnHandler } from './handlers/return.handler';
import { ExchangeHandler } from './handlers/exchange.handler';
import { RefundHandler } from './handlers/refund.handler';
import { MessageProcessor } from './processors/message.processor';
import { EmailProcessor } from './processors/email.processor';
import { SmsProcessor } from './processors/sms.processor';

@Module({
  controllers: [NotificationController],
  providers: [
    OrchestratorService,
    HelpersService,
    MessageProcessor,
    EmailProcessor,
    SmsProcessor,
    EmailStrategy,
    SmsStrategy,
    ChannelStrategyFactory,
    CommunicationService,
    BaseHandler,
    OrderHandler,
    ReturnHandler,
    ExchangeHandler,
    RefundHandler,
  ],
})
export class NotificationModule {}