import { Injectable } from '@nestjs/common';
import { ThrowService } from '@elyasbr/throw/dist/src';
import { ArchError, AssetError, CryptoError, RewardDepositError } from '@elyasbr/tools-chain/dist/src';
import { CryptoRepository } from '@app/common/dataBase/mongo/repositories/crypto.repository';
import { CreateCryptoMongoMapper } from './mapper/crypto/create-crypto-mongo.mapper';
import { CreateCryptoDto } from './dtos/crypto/create-crypto.dto';
import { UpdateCryptoDto } from './dtos/crypto/update-crypto.dto';
import { UpdateCryptoMongoMapper } from './mapper/crypto/update-crypto-mongo.mapper';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { ArchRepository } from '@app/common/dataBase/mongo/repositories/arch.repository';
import { AssetRepository } from '@app/common/dataBase/mongo/repositories/asset.repository';
import { DeleteResponseDto } from '@elyasbr/public/dist/src';
import { PaginateCryptoRMapper } from './rmapper/crypto/paginate-crypto-r.mapper';
import { Err1000, ErrorType } from '@elyasbr/throw/dist/src/err';
import { SectionsErrorsEnum } from '@elyasbr/throw/dist/src/enums/sections-errors.enum';
import { CreateRewardDepositDto } from './dtos/reward-deposit/create-reward-deposit.dto';
import { RewardDepositRepository } from '@app/common/dataBase/mongo/repositories/reward-deposit.repository';
import { CreateRewardDepositMongoMapper } from './mapper/reward-deposit/create-reward-deposit-mongo.mapper';
import { PaginateRewardDepositRMapper } from './rmapper/reward-deposit/paginate-reward-deposit-r.mapper';
import { FilterChainsOfStructDto } from '../struct/dtos/filter-chains-of-struct.dto';
import { PaginateDto } from '@elyasbr/public/dist/src/dtos/paginate.dto';
import { PaginateChainRMapper } from '../chain/rmapper/paginate-chain-r.mapper';
import { FilterRewardDepositDto } from './dtos/reward-deposit/filter-reward-deposit.dto';

@Injectable()
export class RewardDepositService {
  constructor( public rewardDepositRepository : RewardDepositRepository ,
               public assetRepository : AssetRepository ,
               public cryptoRepository : CryptoRepository ,
               public throwService : ThrowService) {
  }
  async createRewardDeposit(createRewardDepositDto : CreateRewardDepositDto) :Promise<PaginateRewardDepositRMapper> {
    try {
      const getOneCrypto = await this.cryptoRepository.findOne({_id : createRewardDepositDto.cryptoId},[])
      if (!getOneCrypto) {
        throw new Err1000(SectionsErrorsEnum.ARCH, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(CryptoError.CRYPTO_NOT_FOUND))
      }
      const getOneAsset = await this.assetRepository.findOne({_id : createRewardDepositDto.assetId} ,[])
      if (!getOneAsset) {
        throw new Err1000(SectionsErrorsEnum.ASSET, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(AssetError.ASSET_NOT_FOUND))
      }
      const createRewardDepositMongoMapper = new CreateRewardDepositMongoMapper(createRewardDepositDto)
      const createRewardDeposit = await this.rewardDepositRepository.create(createRewardDepositMongoMapper , [FieldsMongoEnum.UPDATED_AT])
      const paginateCryptoRMapper = new PaginateRewardDepositRMapper(createRewardDeposit ,getOneCrypto ,getOneAsset )
      return paginateCryptoRMapper
    } catch (e) {
      console.log(e)
        this.throwService.handelError(e , SectionsErrorsEnum.CRYPTO)
    }
  }

  async deleteRewardDeposit(rewardDepositId : string) :Promise<DeleteResponseDto> {
    try {
      const deleteResult =  await this.rewardDepositRepository.deleteOne({ _id : rewardDepositId })
      if (deleteResult.deletedCount==0) {
        throw new Err1000(SectionsErrorsEnum.CRYPTO, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(RewardDepositError.REWARD_DEPOSIT_NOT_FOUND))
      }
      return {
        status : true
      }
    } catch (e) {
      this.throwService.handelError(e ,SectionsErrorsEnum.CRYPTO)
    }
  }

  async getPaginationRewardDeposit(cryptoId : string , filterRewardDepositDto : FilterRewardDepositDto):Promise<PaginateDto<PaginateRewardDepositRMapper>> {
    try {
      const getFilter = filterRewardDepositDto.filter
      const filter = {
        ...getFilter ,
        cryptoId : cryptoId
      }
      const getArrayRewardDeposit =  await this.rewardDepositRepository.find(filter  ,[FieldsMongoEnum.UPDATED_AT]
        ,{  } ,{
          skip : (filterRewardDepositDto.page - 1) * filterRewardDepositDto.limit ,
          limit : filterRewardDepositDto.limit ,
          sort : [{"id" : 1}]
        })
      const mapAssetRewardDeposit = getArrayRewardDeposit.map((item)=> item.assetId)
      const getArrayAssets = await this.assetRepository.find({_id : {$in : mapAssetRewardDeposit}})
      const getArrayCrypto = await this.cryptoRepository.find({})
      const count = await this.rewardDepositRepository.getCountDocuments()
      const final : PaginateRewardDepositRMapper[]=[]
      for (let row of getArrayRewardDeposit) {
        const asset = getArrayAssets.find((item)=> item._id.toString()== row.assetId)
        const crypto = getArrayCrypto.find((item)=> item._id.toString()== row.cryptoId)
         final.push(new PaginateRewardDepositRMapper(row, crypto , asset))
      }
      return new PaginateDto<PaginateRewardDepositRMapper>(final ,filterRewardDepositDto.page , filterRewardDepositDto.limit , final.length )
    } catch (e) {
      this.throwService.handelError(e ,SectionsErrorsEnum.STRUCT)
    }
  }


}
