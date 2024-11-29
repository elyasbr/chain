import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';

@Injectable()
export class ChainRepository extends AbstractRepository<Chain>  {
  protected readonly logger = new Logger(ChainRepository.name);

  constructor(
    @InjectModel(Chain.name) chainModel: Model<Chain>,
    @InjectConnection() connection: Connection,
  ) {
    super(chainModel, connection);
  }


}