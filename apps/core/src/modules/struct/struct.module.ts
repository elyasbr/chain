import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ipg, IpgSchema } from '@app/common/dataBase/mongo/schemas/ipg.schema';
import { Struct, StructSchema } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { StructService } from './struct.service';
import { StructRepository } from '@app/common/dataBase/mongo/repositories/struct.repository';
import { ChainRepository } from '@app/common/dataBase/mongo/repositories/chain.repository';
import { Chain, ChainSchema } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { ThrowModule } from '@elyasbr/throw/dist/src';

@Module({
  imports :[
    MongooseModule.forFeature([
      { name: Struct.name, schema: StructSchema  } ,
      { name: Chain.name, schema: ChainSchema  } ,
    ])
  ],
  providers :[StructService , StructRepository , ChainRepository] ,
  exports :[StructService ]

})
export class StructModule {

}