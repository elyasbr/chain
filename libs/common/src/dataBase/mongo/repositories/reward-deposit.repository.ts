import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { Bank } from '@app/common/dataBase/mongo/schemas/bank.schema';
import { RewardDeposit } from '@app/common/dataBase/mongo/schemas/reward-deposit.schema';

@Injectable()
export class RewardDepositRepository extends AbstractRepository<RewardDeposit>  {
  protected readonly logger = new Logger(RewardDepositRepository.name);

  constructor(
    @InjectModel(Bank.name) rewardDepositModel: Model<RewardDeposit>,
    @InjectConnection() connection: Connection,
  ) {
    super(rewardDepositModel, connection);
  }


}