import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { FeeWithdraw } from '@app/common/dataBase/mongo/schemas/fee-withdraw.schema';

@Injectable()
export class FeeWithdrawRepository extends AbstractRepository<FeeWithdraw>  {
  protected readonly logger = new Logger(FeeWithdrawRepository.name);

  constructor(
    @InjectModel(FeeWithdraw.name) feeWithdrawModel: Model<FeeWithdraw>,
    @InjectConnection() connection: Connection,
  ) {
    super(feeWithdrawModel, connection);
  }


}