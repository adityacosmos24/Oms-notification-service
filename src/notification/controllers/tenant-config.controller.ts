import { Controller, Post } from '@nestjs/common';
import { TenantConfigService } from '../services/tenant-config.service';

@Controller('tenant-config')
export class TenantConfigController {
  constructor(
    private readonly tenantConfigService: TenantConfigService,
  ) {}

  @Post('seed')
  async seedConfig() {
    const tenantId = 'bewakoof';

    await this.tenantConfigService.seedChannelConfig(tenantId);

    return {
      success: true,
      message: `Seeded channel config for tenant=${tenantId}`,
    };
  }
}