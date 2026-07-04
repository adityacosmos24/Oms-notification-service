import {
    IsArray,
    ArrayNotEmpty,
    IsEmail,
    IsOptional,
    IsString,
    IsEnum,
    IsObject,
} from 'class-validator';
import { CommunicationChannel } from '../enums/communication-channel.enum';
import { CommsEventType } from '../enums/comms-event-type.enum';

export class CreateNotificationDto {
    @IsString()
    userId:string;

    @IsOptional()
    @IsString()
    orderId?: string;

    @IsOptional()
    @IsString()
    parentOrderId?: string;

    @IsOptional()
    @IsEmail()
    email?:string;

    @IsOptional()
    @IsString()
    phone?:string;

    @IsEnum(CommsEventType)
    eventType: CommsEventType;

    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(CommunicationChannel, { each: true })
    channels: CommunicationChannel[];

    @IsOptional()
    @IsObject()
    additionalData?: Record<string, any>;
}
