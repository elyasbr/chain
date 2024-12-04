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

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,

      envFilePath: './apps/core/.dev.env',
    }),
    // MongoModule.register({a : 2000}) ,
    MongooseModule.forRoot("mongodb://admin:password123@127.0.0.1:27017/") ,
    ThrowModule ,
    IpgModule ,
    StructModule ,
    ChainModule ,
    ArchModule ,
    AssetModule
  ],
  controllers: [IpgController , StructController , ChainController , ArchController , AssetController ,
  BankController , CountryController , CryptoController ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class CoreModule {}
