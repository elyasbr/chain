import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import {CountryBankRlCrypto} from "@app/common/dataBase/mongo/schemas/country-bank-rl-crypto.schema"


@Injectable()
export class CountryBankRlCryptoRepository extends AbstractRepository<CountryBankRlCrypto>  {
  protected readonly logger = new Logger(CountryBankRlCryptoRepository.name);

  constructor(
    @InjectModel(CountryBankRlCrypto.name) countryBankRlCryptoModel: Model<CountryBankRlCrypto>,
    @InjectConnection() connection: Connection,
  ) {
    super(countryBankRlCryptoModel, connection);
  }


}