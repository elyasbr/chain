import { Injectable } from '@nestjs/common';
import { ThrowService } from '@elyasbr/throw/dist/src';
import {
  ArchError,
  AssetError,
  CryptoError, FeeWithdrawError,
  SpeedWithdrawError,
  WithdrawCryptoError,
} from '@elyasbr/tools-chain/dist/src';

import { PaginateDto } from '@elyasbr/public/dist/src/dtos/paginate.dto';
import { DeleteResponseDto, JsonMethodUtl } from '@elyasbr/public/dist/src';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { SectionsErrorsEnum } from '@elyasbr/throw/dist/src/enums/sections-errors.enum';
import { Err1000, ErrorType } from '@elyasbr/throw/dist/src/err';
import { WithdrawCryptoRepository } from '@app/common/dataBase/mongo/repositories/withdraw-crypto.repository';
import { CreateWithdrawCryptoDto } from './dtos/withdraw-crypto/create-withdraw-crypto.dto';
import { FilterWithdrawCryptoDto } from './dtos/withdraw-crypto/filter-withdraw-crypto.dto';
import { CreateWithdrawCryptoMongoMapper } from './mapper/withdraw-crypto/create-withdraw-crypto-mongo.mapper';
import { CryptoRepository } from '@app/common/dataBase/mongo/repositories/crypto.repository';
import { SpeedWithdrawRepository } from '@app/common/dataBase/mongo/repositories/speed-withdraw.repository';
import { PaginateWithdrawCryptoRMapper } from './rmapper/withdraw-crypto/paginate-withdraw-crypto-r.mapper';
import { AssetRepository } from '@app/common/dataBase/mongo/repositories/asset.repository';
import { ArchRepository } from '@app/common/dataBase/mongo/repositories/arch.repository';
import { ChangeFeeWithdrawDto } from './dtos/fee-withdraw/change-fee-withdraw.dto';
import { ChangeWithdrawCryptoDto } from './dtos/withdraw-crypto/change-withdraw-crypto.dto';

@Injectable()
export class WithdrawCryptoService {
  withdrawCryptoId = "withdrawCryptoId"
  constructor( public withdrawCryptoRepository : WithdrawCryptoRepository ,
               public cryptoRepository : CryptoRepository ,
               public assetRepository : AssetRepository ,
               public archRepository : ArchRepository ,
               public speedWithdrawRepository : SpeedWithdrawRepository ,
               public throwService : ThrowService) {
  }
  async createWithdrawCrypto( createFeeWithdrawDto : CreateWithdrawCryptoDto) {
    try {
      const getOneSpeedWithdraw = await this.speedWithdrawRepository.findOne({_id : createFeeWithdrawDto.speedWithdrawId} ,[])
      if (!getOneSpeedWithdraw) {
        throw new Err1000(SectionsErrorsEnum.SPEED_WITHDRAW,  ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(SpeedWithdrawError.SPEED_WITHDRAW_NOT_FOUND))
      }
      const getOneCrypto = await this.cryptoRepository.findOne({_id : createFeeWithdrawDto.cryptoId} ,[])
      if (!getOneCrypto) {
        throw new Err1000(SectionsErrorsEnum.CRYPTO,  ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(CryptoError.CRYPTO_NOT_FOUND))
      }
      const getOneAsset = await this.assetRepository.findOne({_id : getOneCrypto['assetId']} ,[])
      if (!getOneAsset) {
        throw new Err1000(SectionsErrorsEnum.ASSET,  ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(AssetError.ASSET_NOT_FOUND))
      }
      const getOneArch = await this.archRepository.findOne({_id : getOneCrypto.archId} ,[])
      if (!getOneArch) {
        throw new Err1000(SectionsErrorsEnum.ARCH,  ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(ArchError.ARCH_NOT_FOUND))
      }
      const createWithdrawCryptoMongoMapper = new CreateWithdrawCryptoMongoMapper(createFeeWithdrawDto)
     const createWithdrawCrypto =   await this.withdrawCryptoRepository.create(createWithdrawCryptoMongoMapper,[FieldsMongoEnum.UPDATED_AT])
     const result  = new PaginateWithdrawCryptoRMapper(getOneSpeedWithdraw['_id'].toString() , getOneAsset ,getOneArch , getOneCrypto , createWithdrawCrypto)
     return await JsonMethodUtl.changeField(result, [{ key: "_id", value: this.withdrawCryptoId }])
    } catch (e  ) {
      console.log(e);
      this.throwService.handelError(e,SectionsErrorsEnum.WITHDRAW_CRYPTO)
    }
  }


  async deleteWithdrawCrypto(withdrawCryptoId : string) :Promise<DeleteResponseDto> {
    try {
      const deleteResult =  await this.withdrawCryptoRepository.deleteOne({ _id : withdrawCryptoId })
      if (deleteResult.deletedCount==0) {
        throw new Err1000(SectionsErrorsEnum.WITHDRAW_CRYPTO, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(WithdrawCryptoError.WITHDRAW_CRYPTO_NOT_FOUND))
      }
      return {
        status : true
      }
    } catch (e) {
      this.throwService.handelError(e,SectionsErrorsEnum.WITHDRAW_CRYPTO)
    }
  }
  async getPagination(speedWithdrawId :  string ,filterWithdrawCryptoDto : FilterWithdrawCryptoDto):Promise<PaginateDto<PaginateWithdrawCryptoRMapper>> {
   try {
     const filter = {
       ...filterWithdrawCryptoDto.filter ,
       speedWithdrawId : speedWithdrawId
     }
     console.log(filter);
     const final:PaginateWithdrawCryptoRMapper[]  =[]
     const getArrayWithdrawCrypto =  await this.withdrawCryptoRepository.find(filter  ,
       [FieldsMongoEnum.UPDATED_AT],{  } ,{
       skip : (filterWithdrawCryptoDto.page - 1) * filterWithdrawCryptoDto.limit ,
       limit : filterWithdrawCryptoDto.limit
     })
     const mapCrypto =  getArrayWithdrawCrypto.map((item)=> item.cryptoId)
     const getArrayCrypto = await  this.cryptoRepository.find({_id : {$in : mapCrypto}} ,[])
     const mapAsset = getArrayCrypto.map((item)=> item.assetId.toString())
     const getArrayAsset =await this.assetRepository.find({_id : {$in : mapAsset}},[])
     const mapArch = getArrayCrypto.map((item)=> item.archId)
     const getArrayArch = await this.archRepository.find({_id : { $in : mapArch }} ,[])
     for (let row of getArrayWithdrawCrypto) {
       const crypto = getArrayCrypto.find((item)=> item._id.toString()==row.cryptoId)
       const asset = getArrayAsset.find((item)=> item._id.toString()==crypto.assetId.toString())
       const arch = getArrayArch.find((item)=> item._id.toString()==crypto.archId)
       const paginateWithdrawCryptoRMapper = new PaginateWithdrawCryptoRMapper(row.speedWithdrawId ,asset , arch ,crypto ,row)
         final.push(paginateWithdrawCryptoRMapper)
     }
     const count = await this.withdrawCryptoRepository.getCountDocuments()
     return new PaginateDto<PaginateWithdrawCryptoRMapper>(final ,filterWithdrawCryptoDto.page , filterWithdrawCryptoDto.limit , Number(count) )
   } catch (e) {
     console.log(e);
     this.throwService.handelError(e,SectionsErrorsEnum.WITHDRAW_CRYPTO)
   }
  }

  async changeStatusWithdrawCrypto(withdrawCryptoId : string , changeWithdrawCryptoDto : ChangeWithdrawCryptoDto)  {
    try {
      const getOneFeeWithdraw = await this.withdrawCryptoRepository.findOneAndUpdate({_id : withdrawCryptoId} ,
        { status : changeWithdrawCryptoDto.status})
      if (!getOneFeeWithdraw) {
        throw new Err1000(SectionsErrorsEnum.WITHDRAW_CRYPTO, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(WithdrawCryptoError.WITHDRAW_CRYPTO_NOT_FOUND))
      }
      return JsonMethodUtl.changeField(getOneFeeWithdraw, [{ key: "_id", value: this.withdrawCryptoId }])

    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.WITHDRAW_CRYPTO)
    }
  }
}
