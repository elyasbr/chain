import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';

@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "reward-deposit"})
export class RewardDeposit extends AbstractDocument {

  @Prop({
    required : true
  })
  cryptoId : string

  @Prop({
    required : true
  })
  assetId : string

  @Prop({
    required : true
  })
  amount : number

  @Prop({
    required : true
  })
  status : Boolean

}
export const RewardDepositSchema = SchemaFactory.createForClass( RewardDeposit );
RewardDepositSchema.index({ cryptoId: 1, assetId: 1 }, { unique: true });
