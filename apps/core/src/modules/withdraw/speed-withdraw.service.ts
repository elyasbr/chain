import { Injectable } from '@nestjs/common';
import { ThrowService } from '@elyasbr/throw/dist/src';
import { CountryError, IpgError, SpeedWithdrawError } from '@elyasbr/tools-chain/dist/src';

import { PaginateDto } from '@elyasbr/public/dist/src/dtos/paginate.dto';
import { DeleteResponseDto, JsonMethodUtl } from '@elyasbr/public/dist/src';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { SectionsErrorsEnum } from '@elyasbr/throw/dist/src/enums/sections-errors.enum';
import { Err1000, ErrorType } from '@elyasbr/throw/dist/src/err';
import { CreateSpeedWithdrawDto } from './dtos/speed-withdraw/create-speed-withdraw.dto';
import { CreateSpeedWithdrawMongoMapper } from './mapper/speed-withdraw/create-speed-withdraw-mongo.mapper';
import { SpeedWithdrawRepository } from '@app/common/dataBase/mongo/repositories/speed-withdraw.repository';
import { UpdateSpeedWithdrawDto } from './dtos/speed-withdraw/update-speed-withdraw.dto';
import { UpdateSpeedWithdrawMongoMapper } from './mapper/speed-withdraw/update-speed-withdraw-mongo.mapper';
import { FilterSpeedWithdrawDto } from './dtos/speed-withdraw/filter-speed-withdraw.dto';
import { PaginateSpeedWithdrawRMapper } from './rmapper/speed-withdraw/paginate-speed-withdraw-r.mapper';
import { GetSpeedWithdrawRMapper } from './rmapper/speed-withdraw/get-speed-withdraw-r.mapper';

@Injectable()
export class SpeedWithdrawService {
  speedWithdrawId = "speedWithdrawId"
  constructor( public speedWithdrawRepository : SpeedWithdrawRepository ,

               public throwService : ThrowService) {
  }
  async createSpeedWithdraw(createSpeedWithdrawDto : CreateSpeedWithdrawDto) {
    try {
     const createSpeedWithdrawMongoMapper = new CreateSpeedWithdrawMongoMapper(createSpeedWithdrawDto)
     const resultIpg =   await this.speedWithdrawRepository.create(createSpeedWithdrawMongoMapper,[FieldsMongoEnum.UPDATED_AT])
     return await JsonMethodUtl.changeField(resultIpg, [{ key: "_id", value: this.speedWithdrawId }])
    } catch (e  ) {
      this.throwService.handelError(e,SectionsErrorsEnum.SPEED_WITHDRAW)
    }
  }
  async updateSpeedWithdraw(speedWithdrawId : string , updateSpeedWithdrawDto : UpdateSpeedWithdrawDto) {
    try {
      const updateIpgMongoMapper = new UpdateSpeedWithdrawMongoMapper(updateSpeedWithdrawDto)
      const resultIpg =  await this.speedWithdrawRepository.findOneAndUpdate({_id : speedWithdrawId} , updateIpgMongoMapper ,[FieldsMongoEnum.UPDATED_AT])
      if (!resultIpg) {
        throw new Err1000(SectionsErrorsEnum.SPEED_WITHDRAW, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(SpeedWithdrawError.SPEED_WITHDRAW_NOT_FOUND))
      }
      return JsonMethodUtl.changeField(resultIpg, [{ key: "_id", value: this.speedWithdrawId }])

    } catch (e) {
      this.throwService.handelError(e,SectionsErrorsEnum.SPEED_WITHDRAW)
    }

  }

  async getSpeedWithdraw(speedWithdrawId : string ) : Promise<GetSpeedWithdrawRMapper> {
    try {
      const resultIpg =  await this.speedWithdrawRepository.findOne({_id : speedWithdrawId} ,[FieldsMongoEnum.UPDATED_AT])
      if (!resultIpg) {
        throw new Err1000(SectionsErrorsEnum.IPG, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(SpeedWithdrawError.SPEED_WITHDRAW_NOT_FOUND))
      }
      return JsonMethodUtl.changeField(resultIpg, [{ key: "_id", value: this.speedWithdrawId }])
    } catch (e) {
      this.throwService.handelError(e ,SectionsErrorsEnum.SPEED_WITHDRAW)
    }


  }
  async deleteSpeedWithdraw(speedWithdrawId : string) :Promise<DeleteResponseDto> {
    try {
      const deleteResult =  await this.speedWithdrawRepository.deleteOne({ _id :speedWithdrawId })
      if (deleteResult.deletedCount==0) {
        throw new Err1000(SectionsErrorsEnum.IPG, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(SpeedWithdrawError.SPEED_WITHDRAW_NOT_FOUND))
      }
      return {
        status : true
      }

    } catch (e) {
      this.throwService.handelError(e,SectionsErrorsEnum.SPEED_WITHDRAW)
    }
  }
  async getPagination(filterSpeedWithdrawDto : FilterSpeedWithdrawDto):Promise<PaginateDto<PaginateSpeedWithdrawRMapper>> {
   try {
     const {filter} = filterSpeedWithdrawDto

     const resultIpg =  await this.speedWithdrawRepository.find(filter  ,
       [FieldsMongoEnum.UPDATED_AT],{  } ,{
       skip : (filterSpeedWithdrawDto.page - 1) * filterSpeedWithdrawDto.limit ,
       limit : filterSpeedWithdrawDto.limit
     })
     const count = await this.speedWithdrawRepository.getCountDocuments()
     const result = await this.speedWithdrawRepository.changeFieldArray(resultIpg ,[{ key : "_id" ,value : this.speedWithdrawId}])
     return new PaginateDto<PaginateSpeedWithdrawRMapper>(result ,filterSpeedWithdrawDto.page , filterSpeedWithdrawDto.limit , Number(count) )
   } catch (e) {
     this.throwService.handelError(e,SectionsErrorsEnum.SPEED_WITHDRAW)
   }
  }
}
