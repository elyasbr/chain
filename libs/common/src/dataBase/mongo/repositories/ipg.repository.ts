import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { Ipg } from '@app/common/dataBase/mongo/schemas/ipg.schema';

@Injectable()
export class IpgRepository extends AbstractRepository<Ipg>  {
  protected readonly logger = new Logger(IpgRepository.name);

  constructor(
     @InjectModel(Ipg.name) public ipgModel: Model<Ipg>,
    @InjectConnection() connection: Connection,
  ) {
    super(ipgModel, connection);
  }





}