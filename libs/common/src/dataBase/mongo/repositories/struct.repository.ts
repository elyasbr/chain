import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';

@Injectable()
export class StructRepository extends AbstractRepository<Struct>  {
  protected readonly logger = new Logger(StructRepository.name);

  constructor(
    @InjectModel(Struct.name) structModel: Model<Struct>,
    @InjectConnection() connection: Connection,
  ) {
    super(structModel, connection);
  }


}