import { Module } from '@nestjs/common';
import { IpgService } from './ipg.service';
import { IpgRepository } from '@app/common/dataBase/mongo/repositories/ipg.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Ipg, IpgSchema } from '@app/common/dataBase/mongo/schemas/ipg.schema';
import { Bank, BankSchema } from '@app/common/dataBase/mongo/schemas/bank.schema';
import { BankService } from './bank.service';
import { BankRepository } from '@app/common/dataBase/mongo/repositories/bank.repository';
import { CountryService } from './country.service';
import { Country, CountrySchema } from '@app/common/dataBase/mongo/schemas/country.schema';
import { CountryRepository } from '@app/common/dataBase/mongo/repositories/country.repository';
import { CountryRlBankRepository } from '@app/common/dataBase/mongo/repositories/country-rl-bank.repository';
import { CountryRlBank, CountryRlBankSchema } from '@app/common/dataBase/mongo/schemas/country-rl-bank.schema';
import {
  CountryBankRlCryptoRepository
} from '@app/common/dataBase/mongo/repositories/country-bank-rl-crypto.repository';
import {
  CountryBankCryptoRlIpgRepository
} from '@app/common/dataBase/mongo/repositories/country-bank-crypto-rl-ipg.repository';
import { CryptoRepository } from '@app/common/dataBase/mongo/repositories/crypto.repository';
import {
  CountryBankRlCrypto,
  CountryBankRlCryptoSchema,
} from '@app/common/dataBase/mongo/schemas/country-bank-rl-crypto.schema';
import {
  CountryBankCryptoRlIpg,
  CountryBankCryptoRlIpgSchema,
} from '@app/common/dataBase/mongo/schemas/country-bank-crypto-rl-ipg.schema';
import { CryptoSchema } from '@app/common/dataBase/mongo/schemas/crypto.schema';
import { Arch, ArchSchema } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { ArchRepository } from '@app/common/dataBase/mongo/repositories/arch.repository';
import { Asset, AssetSchema } from '@app/common/dataBase/mongo/schemas/asset.schema';
import { AssetRepository } from '@app/common/dataBase/mongo/repositories/asset.repository';

@Module({
  imports :[
    MongooseModule.forFeature([
      { name: Ipg.name, schema: IpgSchema  } ,
      { name: Bank.name, schema: BankSchema  } ,
      { name: Arch.name, schema: ArchSchema  } ,
      { name: Asset.name, schema: AssetSchema  } ,

      { name: Country.name, schema: CountrySchema  } ,
      { name : Crypto.name , schema : CryptoSchema } ,
      { name: CountryRlBank.name, schema: CountryRlBankSchema  } ,
      { name : CountryBankRlCrypto.name , schema : CountryBankRlCryptoSchema} ,
      {name : CountryBankCryptoRlIpg.name ,schema : CountryBankCryptoRlIpgSchema}

    ])
    ],
  providers :[IpgService ,IpgRepository , BankService , BankRepository , CountryService , CountryRepository ,
               CountryRlBankRepository , CountryBankRlCryptoRepository , CountryBankCryptoRlIpgRepository , CryptoRepository , ArchRepository ,
  AssetRepository]  ,
  exports :[IpgService , BankService , CountryService]

})
export class IpgModule {

}