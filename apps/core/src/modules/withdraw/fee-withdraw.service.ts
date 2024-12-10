import { Injectable } from '@nestjs/common';
import { ThrowService } from '@elyasbr/throw/dist/src';
import { FeeWithdrawError, SpeedWithdrawError, WithdrawCryptoError } from '@elyasbr/tools-chain/dist/src';

import { PaginateDto } from '@elyasbr/public/dist/src/dtos/paginate.dto';
import { JsonMethodUtl } from '@elyasbr/public/dist/src';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { SectionsErrorsEnum } from '@elyasbr/throw/dist/src/enums/sections-errors.enum';
import { Err1000, ErrorType } from '@elyasbr/throw/dist/src/err';
import { PaginateSpeedWithdrawRMapper } from './rmapper/speed-withdraw/paginate-speed-withdraw-r.mapper';
import { WithdrawCryptoRepository } from '@app/common/dataBase/mongo/repositories/withdraw-crypto.repository';
import { FilterWithdrawCryptoDto } from './dtos/withdraw-crypto/filter-withdraw-crypto.dto';
import { FeeWithdrawRepository } from '@app/common/dataBase/mongo/repositories/fee-withdraw.repository';
import { CreateFeeWithdrawDto } from './dtos/fee-withdraw/create-fee-withdraw.dto';
import { CreateFeeWithdrawMongoMapper } from './mapper/fee-withdraw/create-fee-withdraw-mongo.mapper';
import { ChangeFeeWithdrawDto } from './dtos/fee-withdraw/change-fee-withdraw.dto';
import { FeeWithdraw } from '@app/common/dataBase/mongo/schemas/fee-withdraw.schema';
import { FilterFeeWithdrawDto } from './dtos/fee-withdraw/filter-fee-withdraw.dto';
import { PaginateFeeWithdrawRMapper } from './rmapper/fee-withdraw/paginate-fee-withdraw-r.mapper';

@Injectable()
export class FeeWithdrawService {
  feeWithdrawId = "feeWithdrawId"
  constructor( public feeWithdrawRepository : FeeWithdrawRepository ,
               public withdrawCryptoRepository : WithdrawCryptoRepository ,
               public throwService : ThrowService) {
  }
  async createFeeWithdraw(createFeeWithdrawDto : CreateFeeWithdrawDto) {
    try {
      const getOneWithdrawCrypto = await this.withdrawCryptoRepository.findOne({_id : createFeeWithdrawDto.withdrawCryptoId} ,[])
      if (!getOneWithdrawCrypto) {
        throw new Err1000(SectionsErrorsEnum.WITHDRAW_CRYPTO,  ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(WithdrawCryptoError.WITHDRAW_CRYPTO_NOT_FOUND))
      }
     const createWithdrawCryptoMongoMapper = new CreateFeeWithdrawMongoMapper(createFeeWithdrawDto)
     const resultIpg =   await this.feeWithdrawRepository.create(createWithdrawCryptoMongoMapper,[FieldsMongoEnum.UPDATED_AT])
     return await JsonMethodUtl.changeField(resultIpg, [{ key: "_id", value: this.feeWithdrawId }])
    } catch (e  ) {

      this.throwService.handelError(e,SectionsErrorsEnum.WITHDRAW_CRYPTO)
    }
  }

  async changeStatusFeeWithdraw(feeWithdrawId : string , changeFeeWithdrawDto : ChangeFeeWithdrawDto)  {
    try {
      const getOneFeeWithdraw = await this.feeWithdrawRepository.findOneAndUpdate({_id : feeWithdrawId} ,{ status : changeFeeWithdrawDto.status})
      if (!getOneFeeWithdraw) {
        throw new Err1000(SectionsErrorsEnum.SPEED_WITHDRAW, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(FeeWithdrawError.FEE_WITHDRAW_NOT_FOUND))
      }
      const k =  JsonMethodUtl.changeField(getOneFeeWithdraw, [{ key: "_id", value: this.feeWithdrawId }])
      return k
    } catch (e) {
        this.throwService.handelError(e , SectionsErrorsEnum.FEE_WITHDRAW)
    }
  }



  async getPagination(withdrawCryptoId :  string ,filterFeeWithdrawDto : FilterFeeWithdrawDto):Promise<PaginateDto<PaginateFeeWithdrawRMapper>> {
   try {
     const filter = {
       ...filterFeeWithdrawDto.filter ,
       withdrawCryptoId : withdrawCryptoId
     }
     const resultIpg =  await this.withdrawCryptoRepository.find(filter  ,
       [FieldsMongoEnum.UPDATED_AT],{  } ,{
       skip : (filterFeeWithdrawDto.page - 1) * filterFeeWithdrawDto.limit ,
       limit : filterFeeWithdrawDto.limit
     })
     const count = await this.withdrawCryptoRepository.getCountDocuments()
     const result = await this.withdrawCryptoRepository.changeFieldArray(resultIpg ,[{ key : "_id" ,value : this.feeWithdrawId}])
     return new PaginateDto<PaginateFeeWithdrawRMapper>(result ,filterFeeWithdrawDto.page , filterFeeWithdrawDto.limit , Number(count) )
   } catch (e) {
     this.throwService.handelError(e,SectionsErrorsEnum.SPEED_WITHDRAW)
   }
  }
}
