export const KAFKA_TOPICS = {
  COMMS_EMAIL_SMS_TOPIC:
    process.env.KAFKA_COMMS_TOPIC || 'comms-email-sms-topic',
};

export const KAFKA_CLIENTS = {
  NOTIFICATION_CLIENT:
    process.env.KAFKA_CLIENT_ID || 'notification-service',
};

export const KAFKA_CONSUMER_GROUPS = {
  NOTIFICATION_GROUP:
    process.env.KAFKA_GROUP_ID || 'notification-consumer-group',
};