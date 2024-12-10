import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { SpeedWithdraw, SpeedWithdrawSchema } from '@app/common/dataBase/mongo/schemas/speed-withdraw.schema';
import { SpeedWithdrawService } from './speed-withdraw.service';
import { SpeedWithdrawRepository } from '@app/common/dataBase/mongo/repositories/speed-withdraw.repository';
import { WithdrawCryptoService } from './withdraw-crypto.service';
import { WithdrawCryptoRepository } from '@app/common/dataBase/mongo/repositories/withdraw-crypto.repository';
import { WithdrawCrypto, WithdrawCryptoSchema } from '@app/common/dataBase/mongo/schemas/withdraw-crypto.schema';
import { Crypto, CryptoSchema } from '@app/common/dataBase/mongo/schemas/crypto.schema';
import { CryptoRepository } from '@app/common/dataBase/mongo/repositories/crypto.repository';
import { FeeWithdrawRepository } from '@app/common/dataBase/mongo/repositories/fee-withdraw.repository';
import { FeeWithdrawService } from './fee-withdraw.service';
import { FeeWithdraw, FeeWithdrawSchema } from '@app/common/dataBase/mongo/schemas/fee-withdraw.schema';
import { Asset, AssetSchema } from '@app/common/dataBase/mongo/schemas/asset.schema';
import { AssetRepository } from '@app/common/dataBase/mongo/repositories/asset.repository';
import { Arch, ArchSchema } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { ArchRepository } from '@app/common/dataBase/mongo/repositories/arch.repository';

@Module({
  imports :[
    MongooseModule.forFeature([
      { name: SpeedWithdraw.name, schema: SpeedWithdrawSchema  } ,
      { name: WithdrawCrypto.name, schema: WithdrawCryptoSchema  } ,
      { name: Crypto.name, schema: CryptoSchema  } ,
      { name: FeeWithdraw.name, schema: FeeWithdrawSchema  } ,
      { name: Asset.name, schema: AssetSchema  } ,
      { name: Arch.name, schema: ArchSchema  }
    ])
    ],
  providers :[
    SpeedWithdrawService , SpeedWithdrawRepository , WithdrawCryptoService , WithdrawCryptoRepository , CryptoRepository ,
    FeeWithdrawRepository , FeeWithdrawService , AssetRepository , ArchRepository
  ]  ,
  exports :[SpeedWithdrawService , WithdrawCryptoService  , FeeWithdrawService]

})
export class WithdrawModule {

}