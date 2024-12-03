import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { GroupCurrency } from '@app/common/dataBase/mongo/schemas/group-currency.schema';

@Injectable()
export class GroupCurrencyRepository extends AbstractRepository<GroupCurrency>  {
  protected readonly logger = new Logger(GroupCurrencyRepository.name);

  constructor(
    @InjectModel(Arch.name) archModel: Model<Arch>,
    @InjectConnection() connection: Connection,
  ) {
    super(archModel, connection);
  }


}