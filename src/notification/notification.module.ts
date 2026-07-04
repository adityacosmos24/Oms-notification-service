import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { EmailStrategy } from './strategies/email.strategy';
import { SmsStrategy } from './strategies/sms.strategy';
import { ChannelStrategyFactory } from './factories/channel-strategy.factory';
import { CommunicationService } from './services/communication.service';
import { BaseHandler } from './handlers/base.handler';
import { OrderHandler } from './handlers/order.handler';
import { ReturnHandler } from './handlers/return.handler';
import { ExchangeHandler } from './handlers/exchange.handler';
import { RefundHandler } from './handlers/refund.handler';

@Module({
  controllers: [NotificationController],
  providers: [
    NotificationService,
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
