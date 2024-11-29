import { Injectable } from '@nestjs/common';
import { ThrowService } from '@elyasbr/throw/dist/src';
import { ArchError, AssetError, ChainError, StructError } from '@elyasbr/tools-chain/dist/src';

import { AssetRepository } from '@app/common/dataBase/mongo/repositories/asset.repository';
import { CreateAssetDto } from './dtos/asset/create-asset.dto';
import { CreateAssetMongoMapper } from './mapper/asset/create-asset-mongo.mapper';
import { UpdateAssetDto } from './dtos/asset/update-asset.dto';
import { UpdateAssetMongoMapper } from './mapper/asset/update-asset-mongo.mapper';
import { FilterAssetDto } from './dtos/asset/filter-asset.dto';
import { Asset } from '@app/common/dataBase/mongo/schemas/asset.schema';
import { PaginateDto } from '@elyasbr/public/dist/src/dtos/paginate.dto';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { GetAssetRMapper } from './rmapper/asset/get-asset-r.mapper';
import { DeleteResponseDto } from '@elyasbr/public/dist/src';
import { PaginateAssetRMapper } from './rmapper/asset/paginate-asset-r.mapper';

@Injectable()
export class AssetService {
  constructor( public assetRepository : AssetRepository ,
               public throwService : ThrowService) {
  }
  async createAsset(createAssetDto : CreateAssetDto) {
    try{
    console.log("start")
      const createAssetMongoMapper = new CreateAssetMongoMapper(createAssetDto)
      const resultAsset = await this.assetRepository.create(createAssetMongoMapper,[FieldsMongoEnum.UPDATED_AT])
      return this.assetRepository.changeField(resultAsset , [{ key : "_id" ,value : "assetId"}])
    } catch (e) {
        this.throwService.handelError(e)
    }


  }
  async updateAsset(assetId : string , updateAssetDto : UpdateAssetDto) {
    try {
      const updateAssetMongoMapper = new UpdateAssetMongoMapper(updateAssetDto)
      const resultAsset =  await this.assetRepository.findOneAndUpdate({_id : assetId} , updateAssetMongoMapper ,[FieldsMongoEnum.UPDATED_AT])
      if (!resultAsset) {
        throw new Error(JSON.stringify(AssetError.ASSET_NOT_FOUND))
      }
       return await this.assetRepository.changeField(resultAsset ,[{ key : "_id" , value : "assetId"}])

    } catch (e) {
      this.throwService.handelError(e)
    }
  }

  async getAsset(assetId : string ) : Promise<GetAssetRMapper> {
    try {
      const resultAsset =  await this.assetRepository.findOne({_id : assetId} ,[FieldsMongoEnum.UPDATED_AT] )
      if (!resultAsset) {
        throw new Error(JSON.stringify(AssetError.ASSET_NOT_FOUND))
      }
      return this.assetRepository.changeField(resultAsset ,[{ key : "_id" , value : "assetId"}])
    } catch (e) {
      this.throwService.handelError(e)
    }
  }

  async deleteAsset(assetId : string) :Promise<DeleteResponseDto> {
    try {
      const deleteResult =  await this.assetRepository.deleteOne({ _id :assetId })
      if (deleteResult.deletedCount==0) {
        throw new Error(JSON.stringify(AssetError.ASSET_NOT_FOUND))
      }
      return  {
        status : true
      }

    } catch (e) {
      this.throwService.handelError(e)
    }
  }
  async getPagination(filterAssetDto : FilterAssetDto):Promise<PaginateDto<PaginateAssetRMapper>> {
   try {
     const resultAsset =  await this.assetRepository.find(filterAssetDto.filter  ,[FieldsMongoEnum.UPDATED_AT],{  } ,{
       skip : (filterAssetDto.page - 1) * filterAssetDto.limit ,
       limit : filterAssetDto.limit ,
       sort : [{"id" : 1}]
     })
     const count = this.assetRepository.getCountDocuments()
     const result = await this.assetRepository.changeFieldArray(resultAsset , [{key : "_id" , value : "assetId"}])
     return new PaginateDto<PaginateAssetRMapper>(result ,filterAssetDto.page , filterAssetDto.limit , Number(count) )
   } catch (e) {
     this.throwService.handelError(e)
   }
  }
}
