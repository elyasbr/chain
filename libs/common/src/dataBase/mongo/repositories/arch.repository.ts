import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';

@Injectable()
export class ArchRepository extends AbstractRepository<Arch>  {
  protected readonly logger = new Logger(ArchRepository.name);

  constructor(
    @InjectModel(Arch.name) archModel: Model<Arch>,
    @InjectConnection() connection: Connection,
  ) {
    super(archModel, connection);
  }


}