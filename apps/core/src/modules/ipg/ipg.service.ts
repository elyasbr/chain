import { Injectable } from '@nestjs/common';
import { ThrowService } from '@elyasbr/throw/dist/src';
import { CountryError, IpgError } from '@elyasbr/tools-chain/dist/src';
import { IpgRepository } from '@app/common/dataBase/mongo/repositories/ipg.repository';
import { CreateIpgDto } from './dtos/ipg/create-ipg.dto';
import { CreateIpgMongoMapper } from './mapper/ipg/create-ipg-mongo.mapper';
import { UpdateIpgDto } from './dtos/ipg/update-ipg.dto';
import { UpdateIpgMongoMapper } from './mapper/ipg/update-ipg-mongo.mapper';
import { FilterIpgDto } from './dtos/ipg/filter-ipg.dto';
import { PaginateDto } from '@elyasbr/public/dist/src/dtos/paginate.dto';
import { DeleteResponseDto } from '@elyasbr/public/dist/src';
import { PaginateIpgRMapper } from './rmapper/ipg/paginate-ipg-r.mapper';
import { GetIpgRMapper } from './rmapper/ipg/get-ipg-r.mapper';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { SectionsErrorsEnum } from '@elyasbr/throw/dist/src/enums/sections-errors.enum';
import { Err1000, ErrorType } from '@elyasbr/throw/dist/src/err';

@Injectable()
export class IpgService {
  ipgId = "ipgId"
  constructor( public ipgRepository : IpgRepository ,

               public throwService : ThrowService) {
  }
  async createIpg(createIpgDto : CreateIpgDto) {
    try {
     const createIpgMongoMapper = new CreateIpgMongoMapper(createIpgDto)
     const resultIpg =   await this.ipgRepository.create(createIpgMongoMapper,[FieldsMongoEnum.UPDATED_AT])
     return await this.ipgRepository.changeField(resultIpg, [{ key: "_id", value: this.ipgId }])
    } catch (e  ) {
            this.throwService.handelError(e,SectionsErrorsEnum.IPG)
    }
  }
  async updateIpg(ipgId : string , updateIpgDto : UpdateIpgDto) {
    try {
      const updateIpgMongoMapper = new UpdateIpgMongoMapper(updateIpgDto)
      const resultIpg =  await this.ipgRepository.findOneAndUpdate({_id : ipgId} , updateIpgMongoMapper ,[FieldsMongoEnum.UPDATED_AT])
      if (!resultIpg) {
        throw new Err1000(SectionsErrorsEnum.IPG, ErrorType.VALIDATION_ERROR, JSON.stringify(IpgError.IPG_NOT_FOUND))
      }
      return await this.ipgRepository.changeField(resultIpg, [{ key: "_id", value: this.ipgId }])

    } catch (e) {
      this.throwService.handelError(e,SectionsErrorsEnum.IPG)
    }

  }

  async getIpg(ipgId : string ) : Promise<GetIpgRMapper> {
    try {
      const resultIpg =  await this.ipgRepository.findOne({_id : ipgId} ,[FieldsMongoEnum.UPDATED_AT])
      if (!resultIpg) {
        throw new Err1000(SectionsErrorsEnum.IPG, ErrorType.VALIDATION_ERROR, JSON.stringify(IpgError.IPG_NOT_FOUND))
      }
      return await this.ipgRepository.changeField(resultIpg, [{ key: "_id", value: this.ipgId }])
    } catch (e) {
      this.throwService.handelError(e ,SectionsErrorsEnum.IPG)
    }


  }
  async deleteIpg(ipgId : string) :Promise<DeleteResponseDto> {
    try {
      const deleteResult =  await this.ipgRepository.deleteOne({ _id :ipgId })
      if (deleteResult.deletedCount==0) {
        throw new Err1000(SectionsErrorsEnum.IPG, ErrorType.VALIDATION_ERROR, JSON.stringify(IpgError.IPG_NOT_FOUND))
      }
      return {
        status : true
      }

    } catch (e) {
      this.throwService.handelError(e,SectionsErrorsEnum.IPG)
    }
  }
  async getPagination(filterIpgDto : FilterIpgDto):Promise<PaginateDto<PaginateIpgRMapper>> {
   try {
     const {filter} = filterIpgDto

     const resultIpg =  await this.ipgRepository.find(filter  ,[FieldsMongoEnum.UPDATED_AT],{  } ,{
       skip : (filterIpgDto.page - 1) * filterIpgDto.limit ,
       limit : filterIpgDto.limit
     })
     const count = await this.ipgRepository.getCountDocuments()
     const result = await this.ipgRepository.changeFieldArray(resultIpg ,[{ key : "_id" ,value : this.ipgId}])
     return new PaginateDto<PaginateIpgRMapper>(result ,filterIpgDto.page , filterIpgDto.limit , Number(count) )
   } catch (e) {
     this.throwService.handelError(e,SectionsErrorsEnum.IPG)
   }
  }
}
