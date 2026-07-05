import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { KafkaProducerService } from '../services/kafka-producer.service';
import { OrchestratorService } from '../services/orchestrator.service';
import { NotificationConsumer } from '../consumers/notification.consumer';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly orchestratorService: OrchestratorService,
    private readonly notificationConsumer: NotificationConsumer,
  ) {}

  @Post('publish')
  async publishNotification(@Body() createNotificationDto: CreateNotificationDto) {
    await this.kafkaProducerService.publishNotificationEvent(
      createNotificationDto,
    );

    return {
      success: true,
      message: 'Notification event published successfully',
      data: {
        eventType: createNotificationDto.eventType,
        channels: createNotificationDto.channels,
      },
    };
  }

  @Post('process')
  async processNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.orchestratorService.processNotification(createNotificationDto);
  }

  /**
   * Temporary endpoint to simulate Kafka consumer receiving event
   */
  @Post('consume')
  async consumeNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationConsumer.consumeNotificationEvent(
      createNotificationDto,
    );
  }
}