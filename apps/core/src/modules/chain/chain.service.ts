import { Injectable } from '@nestjs/common';
import { ThrowService } from '@elyasbr/throw/dist/src';
import { ChainError, StructError } from '@elyasbr/tools-chain/dist/src';
import { CreateChainDto } from './dtos/create-chain.dto';
import { CreateChainMongoMapper } from './mapper/create-chain-mongo.mapper';
import { ChainRepository } from '@app/common/dataBase/mongo/repositories/chain.repository';
import { UpdateChainDto } from './dtos/update-chain.dto';
import { UpdateChainMongoMapper } from './mapper/update-chain-mongo.mapper';
import { FilterChainDto } from './dtos/filter-chain.dto';
import { ArchRepository } from '@app/common/dataBase/mongo/repositories/arch.repository';
import { PaginateDto } from '@elyasbr/public/dist/src/dtos/paginate.dto';
import { DeleteResponseDto } from '@elyasbr/public/dist/src';
import { PaginateChainRMapper } from './rmapper/paginate-chain-r.mapper';
import { GetChainRMapper } from './rmapper/get-chain-r.mapper';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { SectionsErrorsEnum } from '@elyasbr/throw/dist/src/enums/sections-errors.enum';
import { Err1000, ErrorType } from '@elyasbr/throw/dist/src/err';
import { StructRepository } from '@app/common/dataBase/mongo/repositories/struct.repository';
import { FilterArchOfChainDto } from './dtos/filter-arch-of-chain.dto';
import { PaginateArchRMapper } from '../arch/rmapper/paginate-arch-r.mapper';

@Injectable()
export class ChainService {
  chainId = "chainId"
  constructor( public chainRepository : ChainRepository ,
               public structRepository : StructRepository ,
               public archRepository : ArchRepository ,
               public throwService : ThrowService) {
  }
  async createChain(createChainDto : CreateChainDto) {
    try {
      const  getOneStruct = await this.structRepository.findOne({_id : createChainDto.structId} ,[])
      if (!getOneStruct) {
        throw new Err1000(SectionsErrorsEnum.CHAIN, ErrorType.VALIDATION_ERROR, JSON.stringify(StructError.STRUCT_NOT_FOUND))
      }
      const createChainMongoMapper = new CreateChainMongoMapper(createChainDto)
      const resultChain =  await this.chainRepository.create(createChainMongoMapper,[FieldsMongoEnum.UPDATED_AT])
      return await this.chainRepository.changeField(resultChain , [{key : "_id" , value : this.chainId}])
    } catch (e) {
      console.log(e);
      this.throwService.handelError(e , SectionsErrorsEnum.CHAIN)
    }
  }
  async updateChain(idStruct : string , updateChainDto : UpdateChainDto) {
    try {
      const  getOneStruct = await this.structRepository.findOne({_id : updateChainDto.structId})
      if (!getOneStruct) {
        throw new Err1000(SectionsErrorsEnum.CHAIN, ErrorType.VALIDATION_ERROR, JSON.stringify(StructError.STRUCT_NOT_FOUND))
      }
      const updateChainMongoMapper = new UpdateChainMongoMapper(updateChainDto)
      const resultChain =  await this.chainRepository.findOneAndUpdate({_id : idStruct} , updateChainMongoMapper,[FieldsMongoEnum.UPDATED_AT])
      if (!resultChain) {
        throw new Err1000(SectionsErrorsEnum.CHAIN, ErrorType.VALIDATION_ERROR, JSON.stringify(ChainError.CHAIN_NOT_FOUND))
      }
      return await this.chainRepository.changeField(resultChain , [{key : "_id" , value : this.chainId}])

    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.CHAIN)
    }


  }

  async getChain(chainId : string ):Promise<GetChainRMapper> {
    try {
      const resultChain =  await this.chainRepository.findOne({_id : chainId} ,[FieldsMongoEnum.UPDATED_AT])
      if (!resultChain) {
        throw new Err1000(SectionsErrorsEnum.CHAIN, ErrorType.VALIDATION_ERROR, JSON.stringify(ChainError.CHAIN_NOT_FOUND))
      }
      return await this.chainRepository.changeField(resultChain , [{key : "_id" , value : this.chainId}])
    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.CHAIN)
    }
  }
  async deleteChain(chainId : string) :Promise<DeleteResponseDto> {
    try {
      const resultArch = await this.archRepository.findOne({chainId : chainId})
      if (resultArch) {
        throw new Err1000(SectionsErrorsEnum.CHAIN, ErrorType.VALIDATION_ERROR, JSON.stringify(ChainError.CHAIN_HAVE_ARCH))

      }
      const deleteResult =  await this.chainRepository.deleteOne({ _id :chainId })
      if (deleteResult.deletedCount==0) {
        throw new Error(JSON.stringify(ChainError.CHAIN_NOT_FOUND))
      }
      return {
        status : true
      }

    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.CHAIN)
    }
  }
  async getPagination( filterChainDto : FilterChainDto):Promise<PaginateDto<PaginateChainRMapper>> {
   try {
     const resultChain =  await this.chainRepository.find(filterChainDto.filter  ,
       [FieldsMongoEnum.UPDATED_AT],{  } ,{
       skip : (filterChainDto.page - 1) * filterChainDto.limit ,
       limit : filterChainDto.limit ,
       sort : [{"id" : 1}]
     })
     const count = this.chainRepository.getCountDocuments()
     const result = await this.chainRepository.changeFieldArray(resultChain ,[{ key : "_id" ,value :this.chainId}])
     return new PaginateDto<PaginateChainRMapper>(result ,filterChainDto.page , filterChainDto.limit , Number(count) )
   } catch (e) {
     this.throwService.handelError(e , SectionsErrorsEnum.CHAIN)
   }
  }

  async getPaginationArchFromChain(chainId : string ,filterArchOfChainDto : FilterArchOfChainDto):Promise<PaginateDto<PaginateArchRMapper>> {
    try {
      const getFilter = filterArchOfChainDto.filter
      const filter = {
        ...getFilter ,
        chainId : chainId
      }
      const resultArch =  await this.archRepository.find(filter  ,
        [FieldsMongoEnum.UPDATED_AT],{  } ,{
          skip : (filterArchOfChainDto.page - 1) * filterArchOfChainDto.limit ,
          limit : filterArchOfChainDto.limit ,
          sort : [{"id" : 1}]
        })
      const count = this.archRepository.getCountDocuments()
      const result = await this.archRepository.changeFieldArray(resultArch ,[{ key : "_id" ,value : "archId"}])
      return new PaginateDto<PaginateArchRMapper>(result ,filterArchOfChainDto.page , filterArchOfChainDto.limit , Number(count) )
    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.CHAIN)
    }
  }
}
