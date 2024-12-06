import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from '@elyasbr/dynamic-mongo/dist/src';
import { MongooseModule } from '@nestjs/mongoose';
import { Struct, StructSchema } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { ThrowModule } from '@elyasbr/throw/dist/src';

import { IpgModule } from './modules/ipg/ipg.module';

import { IpgController } from './controller/ipg.controller';
import { StructController } from './controller/struct.controller';
import { StructModule } from './modules/struct/struct.module';
import { ChainModule } from './modules/chain/chain.module';
import { ArchModule } from './modules/arch/arch.module';
import { AssetModule } from './modules/asset/asset.module';
import { ChainController } from './controller/chain.controller';
import { ArchController } from './controller/arch.controller';
import { AssetController } from './controller/asset.controller';
import { BankController } from './controller/bank.controller';
import { CountryController } from './controller/country.controller';
import { CryptoController } from './controller/crypto.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@elyasbr/public/dist/src';
import * as process from 'process';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,

      envFilePath: './dist/.env',
    }),
    // MongoModule.register({a : 2000}) ,
    // MongooseModule.forRoot(`mongodb://root:kEfQqIL0v42B@${process.env.MONGO_REPLICA1},${process.env.MONGO_REPLICA2},` +
    //   `${process.env.MONGO_REPLICA3}/dbnew?retryWrites=true&loadBalanced=false&replicaSet=rs0&readPreference=primary&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1`) ,
    MongooseModule.forRoot(`mongodb://root:kEfQqIL0v42B@192.168.70.185:27017,192.168.70.185:27018,` +
      `192.168.70.185:27019/dbnew?retryWrites=true&loadBalanced=false&replicaSet=rs0&readPreference=primary&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1`) ,

    ThrowModule ,
    IpgModule ,
    StructModule ,
    ChainModule ,
    ArchModule ,
    AssetModule
  ],
  controllers: [
    IpgController , StructController , ChainController , ArchController , AssetController ,
    BankController , CountryController , CryptoController
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class CoreModule {}
