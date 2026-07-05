import { Injectable, Logger } from "@nestjs/common";
import { CreateNotificationDto } from "../dto/create-notification.dto";

@Injectable()
export class KafkaProducerService {
    private readonly logger = new Logger(KafkaProducerService.name);

    async publishNotificationEvent(payload: CreateNotificationDto): Promise<void> {
        this.logger.log(
            `Publishing notification event for eventType=${payload.eventType}`,
        );

        /**
         * For now we are moking kafka publish 
         * later connect real kafka transport.
         */

        this.logger.debug(`kafka payload: ${JSON.stringify(payload)}`);
    }
}