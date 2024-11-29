import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { Bank } from '@app/common/dataBase/mongo/schemas/bank.schema';

@Injectable()
export class BankRepository extends AbstractRepository<Bank>  {
  protected readonly logger = new Logger(BankRepository.name);

  constructor(
    @InjectModel(Bank.name) bankModel: Model<Bank>,
    @InjectConnection() connection: Connection,
  ) {
    super(bankModel, connection);
  }


}