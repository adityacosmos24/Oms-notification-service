import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { OrchestratorService } from './services/orchestrator.service';
import { MessageProcessor } from './processors/message.processor';
import { BaseHandler } from './handlers/base.handler';
import { OrderHandler } from './handlers/order.handler';
import { ReturnHandler } from './handlers/return.handler';
import { ExchangeHandler } from './handlers/exchange.handler';
import { RefundHandler } from './handlers/refund.handler';
import { HelpersService } from './services/helpers.service';
import { EmailProcessor } from './processors/email.processor';
import { SmsProcessor } from './processors/sms.processor';
import { ChannelStrategyFactory } from './factories/channel-strategy.factory';
import { EmailStrategy } from './strategies/email.strategy';
import { SmsStrategy } from './strategies/sms.strategy';
import { CommunicationService } from './services/communication.service';
import { KafkaProducerService } from './services/kafka-producer.service';
import { NotificationConsumer } from './consumers/notification.consumer';

@Module({
  controllers: [NotificationController],
  providers: [
    OrchestratorService,
    MessageProcessor,
    BaseHandler,
    OrderHandler,
    ReturnHandler,
    ExchangeHandler,
    RefundHandler,
    HelpersService,
    EmailProcessor,
    SmsProcessor,
    ChannelStrategyFactory,
    EmailStrategy,
    SmsStrategy,
    CommunicationService,
    KafkaProducerService,
    NotificationConsumer,
  ],
  exports: [KafkaProducerService, NotificationConsumer],
})
export class NotificationModule {}