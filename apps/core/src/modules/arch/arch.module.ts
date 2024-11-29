import { Module } from '@nestjs/common';
import { ArchService } from './arch.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Arch, ArchSchema } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { ArchRepository } from '@app/common/dataBase/mongo/repositories/arch.repository';
import { AssetRepository } from '@app/common/dataBase/mongo/repositories/asset.repository';
import { Asset, AssetSchema } from '@app/common/dataBase/mongo/schemas/asset.schema';
import { Crypto, CryptoSchema } from '@app/common/dataBase/mongo/schemas/crypto.schema';
import { CryptoRepository } from '@app/common/dataBase/mongo/repositories/crypto.repository';
import { ChainRepository } from '@app/common/dataBase/mongo/repositories/chain.repository';
import { Chain, ChainSchema } from '@app/common/dataBase/mongo/schemas/chain.schema';

@Module({
  imports :[
    MongooseModule.forFeature([
      { name: Arch.name, schema: ArchSchema  } ,
      { name: Asset.name, schema: AssetSchema  } ,
      { name: Crypto.name, schema: CryptoSchema  } ,
      { name: Chain.name, schema: ChainSchema  } ,

    ])
  ] ,
  providers:[ArchService , ArchRepository , AssetRepository , CryptoRepository , ChainRepository ] ,
  exports : [ArchService]

})
export class ArchModule {

}