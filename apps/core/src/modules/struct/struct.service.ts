import { Injectable } from '@nestjs/common';
import { CreateStructDto } from './dtos/create-struct.dto';
import { StructRepository } from '@app/common/dataBase/mongo/repositories/struct.repository';
import { FilterStructDto } from './dtos/filter-struct.dto';
import { CreateStructMongoMapper } from './mapper/create-struct-mongo.mapper';
import { ThrowService } from '@elyasbr/throw/dist/src';
import { UpdateStructDto } from './dtos/update-struct.dto';
import { UpdateStructMongoMapper } from './mapper/update-struct-mongo.mapper';
import { StructError } from '@elyasbr/tools-chain/dist/src';
import { ChainRepository } from '@app/common/dataBase/mongo/repositories/chain.repository';
import { PaginateDto } from '@elyasbr/public/dist/src/dtos/paginate.dto';
import { DeleteResponseDto } from '@elyasbr/public/dist/src';
import { FilterChainsOfStructDto } from './dtos/filter-chains-of-struct.dto';
import { GetStructRMapper } from './rmapper/get-struct-r.mapper';
import { PaginateStructRMapper } from './rmapper/paginate-struct-r.mapper';
import { PaginateChainRMapper } from '../chain/rmapper/paginate-chain-r.mapper';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';

@Injectable()
export class StructService {
  constructor( public structRepository : StructRepository ,
               public chainRepository : ChainRepository ,
               public throwService : ThrowService) {
  }
  async createStruct(createStructDto : CreateStructDto) {
    try {
      const createStructMongoMapper = new CreateStructMongoMapper(createStructDto)
     const resultStruct =   await this.structRepository.create(createStructMongoMapper,[FieldsMongoEnum.UPDATED_AT])
     return  this.structRepository.changeField(resultStruct ,[{key:"_id" , value : "structId"}])
      return
    } catch (e) {
        this.throwService.handelError(e)
    }


  }
  async updateStruct(idStruct : string , updateStructDto : UpdateStructDto) {
    try {
      const updateStructMongoMapper = new UpdateStructMongoMapper(updateStructDto)
      const resultStruct =  await this.structRepository.findOneAndUpdate({_id : idStruct} , updateStructMongoMapper , ['updated_at'])
      if (!resultStruct) {
        throw new Error(JSON.stringify(StructError.STRUCT_NOT_FOUND))
      }
      return this.structRepository.changeField(resultStruct, [{ key: "_id", value: "structId" }])
    } catch (e) {
      this.throwService.handelError(e)
    }


  }

  async getStruct(idStruct : string ):Promise<GetStructRMapper> {
    try {
      const resultStruct =  await this.structRepository.findOne({_id : idStruct} ,[FieldsMongoEnum.UPDATED_AT] )
      if (!resultStruct) {
        throw new Error(JSON.stringify(StructError.STRUCT_NOT_FOUND))
      }
      return await this.structRepository.changeField(resultStruct, [{ key: "_id", value: "structId" }])

    } catch (e) {
      this.throwService.handelError(e)
    }


  }
  async deleteStruct(structId : string) : Promise<DeleteResponseDto> {
    try {
      const resultChain = await this.chainRepository.findOne({ structId : structId})
      if (resultChain) {
        throw new Error(JSON.stringify(StructError.STRUCT_HAVE_CHAIN))
      }
      const deleteResult =  await this.structRepository.deleteOne({ _id :structId })
      if (deleteResult.deletedCount==0) {
        throw new Error(JSON.stringify(StructError.STRUCT_NOT_FOUND))
      }
      return  {
        status : true
      }

    } catch (e) {
      this.throwService.handelError(e)
    }
  }
  async getPagination(filterStructDto : FilterStructDto):Promise<PaginateDto<PaginateStructRMapper>> {
   try {
     const resultStruct =  await this.structRepository.find(filterStructDto.filter  ,
       [FieldsMongoEnum.UPDATED_AT] ,{  } ,{
       skip : (filterStructDto.page - 1) * filterStructDto.limit ,
       limit : filterStructDto.limit ,
       sort : [{"id" : 1}]

     })
     const count = this.structRepository.getCountDocuments()
     const result = await this.structRepository.changeFieldArray(resultStruct ,[{ key : "_id" ,value :"structId"}])

     return new PaginateDto<PaginateStructRMapper>(result ,filterStructDto.page , filterStructDto.limit , Number(count) )
   } catch (e) {
     this.throwService.handelError(e)
   }
  }
  async getPaginationChains(structId : string , filterChainsOfStructDto : FilterChainsOfStructDto):Promise<PaginateDto<PaginateChainRMapper>> {
    try {
      const getFilter = filterChainsOfStructDto.filter
      const filter = {
        ...getFilter ,
        structId : structId
      }
      const resultChain =  await this.chainRepository.find(filter  ,[FieldsMongoEnum.UPDATED_AT]
        ,{  } ,{
        skip : (filterChainsOfStructDto.page - 1) * filterChainsOfStructDto.limit ,
        limit : filterChainsOfStructDto.limit ,
        sort : [{"id" : 1}]

      })
      const count = this.structRepository.getCountDocuments()
      const result = await this.chainRepository.changeFieldArray(resultChain ,[{ key : "_id" ,value :"id"}])

      return new PaginateDto<PaginateChainRMapper>(result ,filterChainsOfStructDto.page , filterChainsOfStructDto.limit , Number(count) )
    } catch (e) {
      this.throwService.handelError(e)
    }
  }


}
