import { Injectable, Logger } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { OrchestratorService } from '../services/orchestrator.service';

@Injectable()
export class NotificationConsumer {
  private readonly logger = new Logger(NotificationConsumer.name);

  constructor(private readonly orchestratorService: OrchestratorService) {}

  async consumeNotificationEvent(payload: CreateNotificationDto) {
    this.logger.log(
      `Consumed notification event for eventType=${payload.eventType}`,
    );

    return this.orchestratorService.processNotification(payload);
  }
}