import { Injectable } from '@nestjs/common';
import { ThrowService } from '@elyasbr/throw/dist/src';
import { ArchError, AssetError, CryptoError } from '@elyasbr/tools-chain/dist/src';
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
import { GroupAssetEnum } from '@app/common/enums/group-asset.enum';

@Injectable()
export class CryptoService {
  constructor( public cryptoRepository : CryptoRepository ,
               public assetRepository : AssetRepository ,
               public archRepository : ArchRepository ,
               public throwService : ThrowService) {
  }
  async createCrypto(createCryptoDto : CreateCryptoDto) :Promise<PaginateCryptoRMapper> {
    try {
      const findOneArch = await this.archRepository.findOne({_id : createCryptoDto.archId})
      if (!findOneArch) {
        throw new Error(JSON.stringify(ArchError.ARCH_NOT_FOUND))
      }
      const findOneAsset = await this.assetRepository.findOne({_id : createCryptoDto.assetId})
      if (!findOneAsset) {
        throw new Error(JSON.stringify(AssetError.ASSET_NOT_FOUND))
      }
      if (createCryptoDto.rewardToken?.cryptoId){
        const findOneCrypto = await this.cryptoRepository.findOne({_id : createCryptoDto.rewardToken.cryptoId})
        if (!findOneCrypto) throw  new  Error( JSON.stringify(CryptoError.CRYPTO_NOT_FOUND) )
      }
      const createCryptoMongoMapper = new CreateCryptoMongoMapper(createCryptoDto)
      const resultCrypto = await this.cryptoRepository.create(createCryptoMongoMapper , [FieldsMongoEnum.UPDATED_AT])
      const paginateCryptoRMapper = new PaginateCryptoRMapper(findOneAsset , resultCrypto)
      return paginateCryptoRMapper
    } catch (e) {
        this.throwService.handelError(e)
    }
  }
  async updateCrypto(cryptoId : string , updateCryptoDto : UpdateCryptoDto):Promise<PaginateCryptoRMapper>  {
    try {
      const findOneArch = await this.archRepository.findOne({_id : updateCryptoDto.archId})
      if (!findOneArch) {
        throw new Error(JSON.stringify(ArchError.ARCH_NOT_FOUND))
      }
      const findOneAsset = await this.assetRepository.findOne({_id : updateCryptoDto.assetId})
      if (!findOneAsset) {
        throw new Error(JSON.stringify(AssetError.ASSET_NOT_FOUND))
      }
      if (updateCryptoDto.rewardToken?.cryptoId){
        const findOneCrypto = await this.cryptoRepository.findOne({_id : updateCryptoDto.rewardToken.cryptoId})
        if (!findOneCrypto) throw  new  Error( JSON.stringify(CryptoError.CRYPTO_NOT_FOUND) )
      }
      const updateCryptoMongoMapper = new UpdateCryptoMongoMapper(updateCryptoDto)
      const resultCrypto =  await this.cryptoRepository.findOneAndUpdate({_id : cryptoId} , updateCryptoMongoMapper ,[FieldsMongoEnum.UPDATED_AT])
      if (!resultCrypto) {
        throw new Error(JSON.stringify(CryptoError.CRYPTO_NOT_FOUND))
      }
      const paginateCryptoRMapper = new PaginateCryptoRMapper(findOneAsset , resultCrypto)
      return paginateCryptoRMapper
    } catch (e) {
      this.throwService.handelError(e)
    }
  }

  async getCrypto(cryptoId : string ) {
    try {
      const resultCrypto =  await this.cryptoRepository.findOne({_id : cryptoId} ,[FieldsMongoEnum.UPDATED_AT])
      if (!resultCrypto) {
        throw new Error(JSON.stringify(CryptoError.CRYPTO_NOT_FOUND))
      }
      const findOneAsset = await this.assetRepository.findOne({_id : resultCrypto.assetId})

      const paginateCryptoRMapper = new PaginateCryptoRMapper(findOneAsset , resultCrypto)
      return paginateCryptoRMapper
    } catch (e) {
      this.throwService.handelError(e)
    }
  }
  async deleteCrypto(cryptoId : string) :Promise<DeleteResponseDto> {
    try {
      const deleteResult =  await this.cryptoRepository.deleteOne({ _id : cryptoId })
      if (deleteResult.deletedCount==0) {
        throw new Error(JSON.stringify(CryptoError.CRYPTO_NOT_FOUND))
      }
      return {
        status : true
      }

    } catch (e) {
      this.throwService.handelError(e)
    }
  }

}
