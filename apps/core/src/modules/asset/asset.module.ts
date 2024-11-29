import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CryptoService } from './crypto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Arch, ArchSchema } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { Asset, AssetSchema } from '@app/common/dataBase/mongo/schemas/asset.schema';
import { Crypto, CryptoSchema } from '@app/common/dataBase/mongo/schemas/crypto.schema';
import { AssetRepository } from '@app/common/dataBase/mongo/repositories/asset.repository';
import { CryptoRepository } from '@app/common/dataBase/mongo/repositories/crypto.repository';
import { ArchRepository } from '@app/common/dataBase/mongo/repositories/arch.repository';

@Module({
  imports :[
    MongooseModule.forFeature([
      { name: Asset.name, schema: AssetSchema  } ,
      { name: Crypto.name, schema: CryptoSchema  } ,
      { name: Arch.name, schema: ArchSchema  } ,

    ])
  ] ,
  providers :[ AssetService , CryptoService , AssetRepository , CryptoRepository ,ArchRepository],
  exports :[ AssetService , CryptoService]


})
export class AssetModule {

}