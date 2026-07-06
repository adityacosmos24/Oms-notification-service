import { Injectable, Logger } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { OrchestratorService } from '../services/orchestrator.service';
import { KAFKA_TOPICS } from '../config/kafka.constants';

@Injectable()
export class NotificationConsumer {
  private readonly logger = new Logger(NotificationConsumer.name);

  constructor(private readonly orchestratorService: OrchestratorService) {}

  @EventPattern(KAFKA_TOPICS.COMMS_EMAIL_SMS_TOPIC)
  async handleNotificationEvent(
    @Payload() payload: any,
    @Ctx() context: KafkaContext,
  ) {
    const topic = context.getTopic();
    const partition = context.getPartition();

    const message = payload?.value ?? payload;

    this.logger.log(
      `Consumed Kafka notification event from topic=${topic}, partition=${partition}, eventType=${message?.eventType}`,
    );

    return this.orchestratorService.processNotification(
      message as CreateNotificationDto,
    );
  }
}