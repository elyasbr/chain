import { Module } from '@nestjs/common';
import { ChainService } from './chain.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chain, ChainSchema } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { ChainRepository } from '@app/common/dataBase/mongo/repositories/chain.repository';
import { ArchRepository } from '@app/common/dataBase/mongo/repositories/arch.repository';
import { Arch, ArchSchema } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { Struct, StructSchema } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { StructRepository } from '@app/common/dataBase/mongo/repositories/struct.repository';

@Module({
  imports :[
    MongooseModule.forFeature([
      { name: Chain.name, schema: ChainSchema  } ,
      { name: Arch.name, schema: ArchSchema  } ,
      { name: Struct.name, schema: StructSchema  } ,
    ])
  ] ,
  providers :[ChainService , ChainRepository,ArchRepository , StructRepository] ,
  exports :[ChainService]

})
export class ChainModule {

}