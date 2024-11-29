import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { Country } from '@app/common/dataBase/mongo/schemas/country.schema';

@Injectable()
export class CountryRepository extends AbstractRepository<Country>  {
  protected readonly logger = new Logger(CountryRepository.name);

  constructor(
    @InjectModel(Country.name) countryModel: Model<Country>,
    @InjectConnection() connection: Connection,
  ) {
    super(countryModel, connection);
  }


}