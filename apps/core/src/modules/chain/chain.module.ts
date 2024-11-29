import { Module } from '@nestjs/common';
import { ChainService } from './chain.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ipg, IpgSchema } from '@app/common/dataBase/mongo/schemas/ipg.schema';
import { Chain, ChainSchema } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { ChainRepository } from '@app/common/dataBase/mongo/repositories/chain.repository';
import { ArchRepository } from '@app/common/dataBase/mongo/repositories/arch.repository';
import { Arch, ArchSchema } from '@app/common/dataBase/mongo/schemas/arch.schema';

@Module({
  imports :[
    MongooseModule.forFeature([
      { name: Chain.name, schema: ChainSchema  } ,
      { name: Arch.name, schema: ArchSchema  } ,
    ])
  ] ,
  providers :[ChainService , ChainRepository,ArchRepository] ,
  exports :[ChainService]

})
export class ChainModule {

}