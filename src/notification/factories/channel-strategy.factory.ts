import { Injectable, BadRequestException } from '@nestjs/common';
import { EmailStrategy } from '../strategies/email.strategy';
import { SmsStrategy } from '../strategies/sms.strategy';
import { CommunicationChannel } from '../enums/communication-channel.enum';
import { IChannelStrategy } from '../interfaces/channel-strategy.interface';

@Injectable()
export class ChannelStrategyFactory {
    private readonly strategies: Map<CommunicationChannel, IChannelStrategy>;

    constructor(
        private readonly emailStrategy: EmailStrategy,
        private readonly smsStrategy: SmsStrategy,
    ) {
        this.strategies = new Map<CommunicationChannel, IChannelStrategy>([
            [CommunicationChannel.EMAIL, this.emailStrategy],
            [CommunicationChannel.SMS, this.smsStrategy],
        ]);
    }

    getStrategy(channel: CommunicationChannel): IChannelStrategy {
        const strategy = this.strategies.get(channel);

        if(!strategy) {
            throw new BadRequestException(
                `No strategy found for channel: ${channel}`,
            );
        }

        return strategy;
    }
}