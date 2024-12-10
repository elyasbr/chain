
import { ApiProperty } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { Allow, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { SpeedWithdrawError } from '@elyasbr/tools-chain/dist/src';
import { SpeedWithdraw } from '@app/common/dataBase/mongo/schemas/speed-withdraw.schema';
import { Crypto } from '@app/common/dataBase/mongo/schemas/crypto.schema';
import { WithdrawCrypto } from '@app/common/dataBase/mongo/schemas/withdraw-crypto.schema';
import { Asset } from '@app/common/dataBase/mongo/schemas/asset.schema';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';


export class PaginateWithdrawCryptoRMapper  {
  @ApiProperty()
  withdrawCryptoId : string

  @ApiProperty()
  speedWithdrawId : string

  @ApiProperty()
  cryptoId : string

  @ApiProperty()
  slugArch : string

  @ApiProperty()
  symbolArch : string

  @ApiProperty()
  slugAsset : string

  @ApiProperty()
  symbolAsset : string

  @ApiProperty()
  rateWithdraw : string

  @ApiProperty()
  status :Boolean

  @ApiProperty({
    default: (new Date()).toJSON()
  })
  created_at : Date

  constructor(speedWithdrawId : string , asset : Asset, arch : Arch ,crypto : Crypto , withdrawCrypto : WithdrawCrypto) {
    this.withdrawCryptoId = withdrawCrypto['_id'].toString()
    this.speedWithdrawId = speedWithdrawId
    this.slugArch = arch.slug
    this.symbolArch=arch.symbol
    this.slugAsset = asset.slug
    this.symbolAsset = asset.symbol
    this.created_at = withdrawCrypto[FieldsMongoEnum.CREATED_AT]
    this.status = withdrawCrypto.status
  }


}