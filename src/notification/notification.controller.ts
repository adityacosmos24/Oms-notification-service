import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notification: NotificationService) {}
    @Post()
    async sendNotification(@Body() CreateNotificationDto: CreateNotificationDto){
        return this.notification.sendNotification(CreateNotificationDto);
    }
}