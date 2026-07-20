import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CommsEventType } from '../config/comms.enum';
import { CommunicationChannel } from '../enums/communication-channel.enum';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEnum(CommsEventType)
  eventType: CommsEventType;

  @IsOptional()
  @IsArray()
  @IsEnum(CommunicationChannel, { each: true })
  channels?: CommunicationChannel[];
}