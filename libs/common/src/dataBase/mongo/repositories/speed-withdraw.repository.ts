import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { SpeedWithdraw } from '@app/common/dataBase/mongo/schemas/speed-withdraw.schema';

@Injectable()
export class SpeedWithdrawRepository extends AbstractRepository<SpeedWithdraw>  {
  protected readonly logger = new Logger(SpeedWithdrawRepository.name);

  constructor(
    @InjectModel(SpeedWithdraw.name) speedWithdrawModel: Model<SpeedWithdraw>,
    @InjectConnection() connection: Connection,
  ) {
    super(speedWithdrawModel, connection);
  }


}