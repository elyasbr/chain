import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { Country } from '@app/common/dataBase/mongo/schemas/country.schema';
import { CountryRlBank } from '@app/common/dataBase/mongo/schemas/country-rl-bank.schema';

@Injectable()
export class CountryRlBankRepository extends AbstractRepository<CountryRlBank>  {
  protected readonly logger = new Logger(CountryRlBankRepository.name);

  constructor(
    @InjectModel(CountryRlBank.name) countryRlBankModel: Model<CountryRlBank>,
    @InjectConnection() connection: Connection,
  ) {
    super(countryRlBankModel, connection);
  }


}