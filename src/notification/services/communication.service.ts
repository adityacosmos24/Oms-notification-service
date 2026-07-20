import { Injectable, Logger } from '@nestjs/common';

/**
 * Boundary to the actual email/SMS providers.
 * Currently logs the outgoing message; swap the bodies with
 * real provider SDK calls when integrating.
 */
@Injectable()
export class CommunicationService {
  private readonly logger = new Logger(CommunicationService.name);

  async sendEmailNotification(payload: {
    userId: string;
    email: string;
    message: string;
  }): Promise<void> {
    const { userId, email, message } = payload;

    this.logger.log(
      `Sending EMAIL to ${email} for user ${userId}: ${message}`,
    );
  }

  async sendSmsNotification(payload: {
    userId: string;
    phone: string;
    message: string;
    templateId?: string;
  }): Promise<void> {
    const { userId, phone, message, templateId } = payload;

    this.logger.log(
      `Sending SMS to ${phone} for user ${userId} (templateId=${templateId}): ${message}`,
    );
  }
}
