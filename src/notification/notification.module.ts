import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

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
import {
  KAFKA_CLIENTS,
  KAFKA_CONSUMER_GROUPS,
} from './config/kafka.constants';
import {
  TenantConfig,
  TenantConfigSchema,
} from './schemas/tenant-config.schema';
import { TenantConfigService } from './services/tenant-config.service';
import { TenantConfigController } from './controllers/tenant-config.controller';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_CLIENTS.NOTIFICATION_CLIENT,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: KAFKA_CLIENTS.NOTIFICATION_CLIENT,
            brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
          },
          consumer: {
            groupId: `${KAFKA_CONSUMER_GROUPS.NOTIFICATION_GROUP}-producer`,
          },
        },
      },
    ]),
    MongooseModule.forFeature([
      {
        name: TenantConfig.name,
        schema: TenantConfigSchema,
      },
    ]),
  ],
  controllers: [NotificationController, TenantConfigController],
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
    TenantConfigService,
  ],
  exports: [KafkaProducerService, TenantConfigService],
})
export class NotificationModule {}