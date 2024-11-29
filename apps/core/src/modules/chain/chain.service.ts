import { Injectable } from '@nestjs/common';
import { CreateStructDto } from '../struct/dtos/create-struct.dto';
import { StructRepository } from '@app/common/dataBase/mongo/repositories/struct.repository';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { FilterStructDto } from '../struct/dtos/filter-struct.dto';
import { CreateStructMongoMapper } from '../struct/mapper/create-struct-mongo.mapper';
import { ThrowService } from '@elyasbr/throw/dist/src';
import { UpdateStructDto } from '../struct/dtos/update-struct.dto';
import { UpdateStructMongoMapper } from '../struct/mapper/update-struct-mongo.mapper';
import { ChainError, StructError } from '@elyasbr/tools-chain/dist/src';
import { CreateChainDto } from './dtos/create-chain.dto';
import { CreateChainMongoMapper } from './mapper/create-chain-mongo.mapper';
import { ChainRepository } from '@app/common/dataBase/mongo/repositories/chain.repository';
import { UpdateChainDto } from './dtos/update-chain.dto';
import { UpdateChainMongoMapper } from './mapper/update-chain-mongo.mapper';
import { FilterChainDto } from './dtos/filter-chain.dto';
import { ArchRepository } from '@app/common/dataBase/mongo/repositories/arch.repository';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { PaginateDto } from '@elyasbr/public/dist/src/dtos/paginate.dto';
import { DeleteResponseDto } from '@elyasbr/public/dist/src';
import { PaginateChainRMapper } from './rmapper/paginate-chain-r.mapper';
import { GetChainRMapper } from './rmapper/get-chain-r.mapper';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';

@Injectable()
export class ChainService {
  constructor( public chainRepository : ChainRepository ,
               public archRepository : ArchRepository ,
               public throwService : ThrowService) {
  }
  async createChain(createChainDto : CreateChainDto) {
    try {
      const createChainMongoMapper = new CreateChainMongoMapper(createChainDto)
      const resultChain =  await this.chainRepository.create(createChainMongoMapper,[FieldsMongoEnum.UPDATED_AT])
      return await this.chainRepository.changeField(resultChain , [{key : "_id" , value : "chainId"}])
    } catch (e) {
        this.throwService.handelError(e)
    }
  }
  async updateChain(idStruct : string , updateChainDto : UpdateChainDto) {
    try {
      const updateChainMongoMapper = new UpdateChainMongoMapper(updateChainDto)
      const resultChain =  await this.chainRepository.findOneAndUpdate({_id : idStruct} , updateChainMongoMapper,[FieldsMongoEnum.UPDATED_AT])
      if (!resultChain) {
        throw new Error(JSON.stringify(ChainError.CHAIN_NOT_FOUND))
      }
      return await this.chainRepository.changeField(resultChain , [{key : "_id" , value : "chainId"}])

    } catch (e) {
      this.throwService.handelError(e)
    }


  }

  async getChain(chainId : string ):Promise<GetChainRMapper> {
    try {
      const resultChain =  await this.chainRepository.findOne({_id : chainId} ,[FieldsMongoEnum.UPDATED_AT])
      if (!resultChain) {
        throw new Error(JSON.stringify(ChainError.CHAIN_NOT_FOUND))
      }
      return await this.chainRepository.changeField(resultChain , [{key : "_id" , value : "chainId"}])
    } catch (e) {
      this.throwService.handelError(e)
    }


  }
  async deleteChain(chainId : string) :Promise<DeleteResponseDto> {
    try {
      const resultArch = await this.archRepository.findOne({chainId : chainId})
      if (resultArch) {
        throw new Error(JSON.stringify(ChainError.CHAIN_HAVE_ARCH))

      }
      const deleteResult =  await this.chainRepository.deleteOne({ _id :chainId })
      if (deleteResult.deletedCount==0) {
        throw new Error(JSON.stringify(ChainError.CHAIN_NOT_FOUND))
      }
      return {
        status : true
      }

    } catch (e) {
      this.throwService.handelError(e)
    }
  }
  async getPagination(filterChainDto : FilterChainDto):Promise<PaginateDto<PaginateChainRMapper>> {
   try {
     const resultChain =  await this.chainRepository.find(filterChainDto.filter  ,
       [FieldsMongoEnum.UPDATED_AT],{  } ,{
       skip : (filterChainDto.page - 1) * filterChainDto.limit ,
       limit : filterChainDto.limit ,
       sort : [{"id" : 1}]

     })
     const count = this.chainRepository.getCountDocuments()
     const result = await this.chainRepository.changeFieldArray(resultChain ,[{ key : "_id" ,value :"chainId"}])
     return new PaginateDto<PaginateChainRMapper>(result ,filterChainDto.page , filterChainDto.limit , Number(count) )
   } catch (e) {
     this.throwService.handelError(e)
   }
  }
}
