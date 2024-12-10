import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { TypeAsset } from '@app/common/enums/type-asset.enum';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { GroupAssetEnum } from '@app/common/enums/group-asset.enum';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "asset"})
export class Asset extends AbstractDocument {


  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  slug : string

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  symbol : string



  @Prop()
  rateTrade? : number

  @Prop()
  rateWithdarw? : number

  @Prop()
  isStableCoin? : Boolean

  @Prop()
  groupCurrency? : GroupAssetEnum[]

  @Prop({
    type: String,
    enum : TypeAsset,
    default: TypeAsset.CRYPTO
  },)
  typeAsset : TypeAsset

  @Prop({
    default :false
  })
  isWithdraw : Boolean

  @Prop({
    default :false
  })
  isDeposit : Boolean

  @Prop()
  startDeposit? : Date

  @Prop()
  startWithdraw? : Date

  @Prop()
  startTrade? : Date

  @Prop()
  decimalShow : number

  @Prop()
  decimalCalc : number


  @Prop()
  logo? : string

  @Prop({
    default : true
  })
  isSystem :Boolean

  @Prop({
    enum : StatusAssetEnum ,
    default: StatusAssetEnum.ACTIVE
  })
  status? : StatusAssetEnum

}

export const AssetSchema = SchemaFactory.createForClass( Asset );