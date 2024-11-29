import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { AbstractRepository } from '@elyasbr/dynamic-mongo/dist/src';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { Asset } from '@app/common/dataBase/mongo/schemas/asset.schema';

@Injectable()
export class AssetRepository extends AbstractRepository<Asset>  {
  protected readonly logger = new Logger(AssetRepository.name);

  constructor(
    @InjectModel(Asset.name) assetModel: Model<Asset>,
    @InjectConnection() connection: Connection,
  ) {
    super(assetModel, connection);
  }


}