import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { WithdrawCrypto } from '@app/common/dataBase/mongo/schemas/withdraw-crypto.schema';
import { UserWallet } from '@app/common/dataBase/mongo/schemas/user-wallet.schema';

@Injectable()
export class WithdrawCryptoRepository extends AbstractRepository<UserWallet>  {
  protected readonly logger = new Logger(WithdrawCryptoRepository.name);

  constructor(
    @InjectModel(UserWallet.name) userWalletModel: Model<UserWallet>,
    @InjectConnection() connection: Connection,
  ) {
    super(userWalletModel, connection);
  }


}