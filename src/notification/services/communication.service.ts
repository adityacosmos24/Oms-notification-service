import { Injectable } from '@nestjs/common';

@Injectable()
export class CommunicationService {
  async sendEmailNotification(payload: {
    userId: string;
    email: string;
    message: string;
  }): Promise<void> {
    const { userId, email, message } = payload;

    console.log(
      `[CommunicationService] Sending EMAIL to ${email} for user ${userId}`,
    );
  }

  async sendSmsNotification(payload: {
    userId: string;
    phone: string;
    message: string;
  }): Promise<void> {
    const { userId, phone, message } = payload;

    console.log(
      `[CommunicationService] Sending SMS to ${phone} for user ${userId}`,
    );
  }
}