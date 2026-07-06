import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { KafkaProducerService } from '../services/kafka-producer.service';
import { OrchestratorService } from '../services/orchestrator.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly orchestratorService: OrchestratorService,
  ) {}

  /**
   * Real architecture entry:
   * Publish notification event to Kafka
   */
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

  /**
   * Temporary direct-processing endpoint for debugging
   */
  @Post('process')
  async processNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.orchestratorService.processNotification(createNotificationDto);
  }
}