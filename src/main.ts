import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  KAFKA_CLIENTS,
  KAFKA_CONSUMER_GROUPS,
} from './notification/config/kafka.constants';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: KAFKA_CLIENTS.NOTIFICATION_CLIENT,
        brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
      },
      consumer: {
        groupId: KAFKA_CONSUMER_GROUPS.NOTIFICATION_GROUP,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  logger.log('HTTP app running on http://localhost:3000');
  logger.log('Kafka microservice connected');
}
bootstrap();
