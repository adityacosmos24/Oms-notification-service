import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { KafkaProducerService } from '../services/kafka-producer.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  /**
   * Publish a notification event to Kafka.
   * The NotificationConsumer picks it up and runs the processing pipeline.
   */
  @Post('publish')
  async publishNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
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
}