import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { Crypto } from '@app/common/dataBase/mongo/schemas/crypto.schema';

@Injectable()
export class CryptoRepository extends AbstractRepository<Crypto>  {
  protected readonly logger = new Logger(CryptoRepository.name);

  constructor(
    @InjectModel(Crypto.name) cryptoModel: Model<Crypto>,
    @InjectConnection() connection: Connection,
  ) {
    super(cryptoModel, connection);
  }


}