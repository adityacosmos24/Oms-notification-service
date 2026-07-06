import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { KAFKA_CLIENTS, KAFKA_TOPICS } from '../config/kafka.constants';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private readonly logger = new Logger(KafkaProducerService.name);

  constructor(
    @Inject(KAFKA_CLIENTS.NOTIFICATION_CLIENT)
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
    this.logger.log('Kafka producer connected');
  }

  async publishNotificationEvent(payload: CreateNotificationDto): Promise<void> {
    this.logger.log(
      `Publishing notification event to Kafka for eventType=${payload.eventType}`,
    );

    await firstValueFrom(
      this.kafkaClient.emit(KAFKA_TOPICS.COMMS_EMAIL_SMS_TOPIC, payload),
    );
  }
}