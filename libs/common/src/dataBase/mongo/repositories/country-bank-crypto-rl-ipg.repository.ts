import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';


import { CountryBankCryptoRlIpg } from '@app/common/dataBase/mongo/schemas/country-bank-crypto-rl-ipg.schema';

@Injectable()
export class CountryBankCryptoRlIpgRepository extends AbstractRepository<CountryBankCryptoRlIpg>  {
  protected readonly logger = new Logger(CountryBankCryptoRlIpgRepository.name);

  constructor(
    @InjectModel(CountryBankCryptoRlIpg.name) countryBankCryptoRlIpgModel: Model<CountryBankCryptoRlIpg>,
    @InjectConnection() connection: Connection,
  ) {
    super(countryBankCryptoRlIpgModel, connection);
  }


}