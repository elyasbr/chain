import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { StatusUserWalletEnum } from '@app/common/enums/status-user-wallet.enum';
import { RewardDepositSchema } from '@app/common/dataBase/mongo/schemas/reward-deposit.schema';
@Schema({ versionKey: false  ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } , collection : "user-wallet"})
export class UserWallet extends AbstractDocument {

  @Prop()
  userId : string

  @Prop()
  assetId : string

  @Prop()
  amount : string

  @Prop({
    default : true
  })
  isWithdraw : Boolean

  @Prop({
    default : true
  })
  isDeposit : Boolean

  @Prop({
    type : String ,
    enum : StatusUserWalletEnum ,
    default: StatusUserWalletEnum.ACTIVE
  })
  status : StatusUserWalletEnum
}
export const UserWalletSchema = SchemaFactory.createForClass( UserWallet );
UserWalletSchema.index({ userId: 1, assetId: 1 }, { unique: true });
