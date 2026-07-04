import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { OrchestratorService } from './services/orchestrator.service';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly orchestratorService: OrchestratorService,
    ) {}
    @Post()
    async sendNotification(@Body() CreateNotificationDto: CreateNotificationDto){
        return this.orchestratorService.processNotification(CreateNotificationDto);
    }
}