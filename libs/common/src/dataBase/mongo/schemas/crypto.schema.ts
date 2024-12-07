import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';

@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "crypto"})
export class Crypto extends AbstractDocument {


  @Prop()
  archId : string

  @Prop()
  assetId : string

  @Prop()
  isWithdraw : Boolean

  @Prop()
  isDeposit : Boolean

  @Prop()
  smartContractId : string

  @Prop()
  rateWithdraw : number

  @Prop()
  decimalBlockchain : number

  @Prop()
  minInvest : number

  @Prop({
    enum : StatusAssetEnum ,
    default: StatusAssetEnum.ACTIVE
  })
  status : StatusAssetEnum

}
export const CryptoSchema = SchemaFactory.createForClass( Crypto );
CryptoSchema.index({ archId: 1, assetId: 1 }, { unique: true });
