import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type TenantConfigDocument = HydratedDocument<TenantConfig>;

@Schema({
  collection: 'tenant_configs',
  timestamps: true,
})
export class TenantConfig {
  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  key: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  value: Record<string, string[]>;
}

export const TenantConfigSchema = SchemaFactory.createForClass(TenantConfig);