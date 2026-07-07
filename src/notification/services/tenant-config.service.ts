import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TenantConfig,
  TenantConfigDocument,
} from '../schemas/tenant-config.schema';
import { COMMS_CONFIG_KEYS } from '../config/comms.constants';
import { CommunicationChannel } from '../enums/communication-channel.enum';

@Injectable()
export class TenantConfigService {
  private readonly logger = new Logger(TenantConfigService.name);

  constructor(
    @InjectModel(TenantConfig.name)
    private readonly tenantConfigModel: Model<TenantConfigDocument>,
  ) {}

  async getChannelConfig(
    tenantId: string,
  ): Promise<Record<string, CommunicationChannel[]>> {
    const config = await this.tenantConfigModel.findOne({
      tenantId,
      key: COMMS_CONFIG_KEYS.CHANNEL_CONFIG,
    });

    if (!config) {
      this.logger.warn(
        `No channel config found for tenantId=${tenantId}, returning empty config`,
      );
      return {};
    }

    return (config.value || {}) as Record<string, CommunicationChannel[]>;
  }

  async resolveChannels(
    tenantId: string,
    eventType: string,
  ): Promise<CommunicationChannel[]> {
    const channelConfig = await this.getChannelConfig(tenantId);
    return channelConfig[eventType] || [];
  }

  async seedChannelConfig(tenantId: string) {
    return this.tenantConfigModel.findOneAndUpdate(
      {
        tenantId,
        key: COMMS_CONFIG_KEYS.CHANNEL_CONFIG,
      },
      {
        tenantId,
        key: COMMS_CONFIG_KEYS.CHANNEL_CONFIG,
        value: {
          ORDER_CONFIRM: ['EMAIL', 'SMS'],
          ORDER_SHIPPED: ['EMAIL'],
          RETURN_INITIATED: ['SMS'],
          REFUND_INITIATED: ['EMAIL', 'SMS'],
        },
      },
      { upsert: true, new: true },
    );
  }
}