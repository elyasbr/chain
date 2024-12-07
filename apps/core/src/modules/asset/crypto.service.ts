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
import { Err1000, ErrorType } from '@elyasbr/throw/dist/src/err';
import { SectionsErrorsEnum } from '@elyasbr/throw/dist/src/enums/sections-errors.enum';

@Injectable()
export class CryptoService {
  constructor( public cryptoRepository : CryptoRepository ,
               public assetRepository : AssetRepository ,
               public archRepository : ArchRepository ,
               public throwService : ThrowService) {
  }
  async createCrypto(createCryptoDto : CreateCryptoDto) :Promise<PaginateCryptoRMapper> {
    try {
      const getOneArch = await this.archRepository.findOne({_id : createCryptoDto.archId},[])
      if (!getOneArch) {
        throw new Err1000(SectionsErrorsEnum.ARCH, ErrorType.VALIDATION_ERROR, JSON.stringify(ArchError.ARCH_NOT_FOUND))
      }
      const getOneAsset = await this.assetRepository.findOne({_id : createCryptoDto.assetId} ,[])
      console.log(getOneAsset);
      if (!getOneAsset) {
        throw new Err1000(SectionsErrorsEnum.ASSET, ErrorType.VALIDATION_ERROR, JSON.stringify(AssetError.ASSET_NOT_FOUND))
      }
      const createCryptoMongoMapper = new CreateCryptoMongoMapper(createCryptoDto)
      const createCrypto = await this.cryptoRepository.create(createCryptoMongoMapper , [FieldsMongoEnum.UPDATED_AT])
      const paginateCryptoRMapper = new PaginateCryptoRMapper(getOneAsset , createCrypto)
      return paginateCryptoRMapper
    } catch (e) {
      console.log(e)
        this.throwService.handelError(e , SectionsErrorsEnum.CRYPTO)
    }
  }
  async updateCrypto(cryptoId : string , updateCryptoDto : UpdateCryptoDto):Promise<PaginateCryptoRMapper>  {
    try {
      const findOneArch = await this.archRepository.findOne({_id : updateCryptoDto.archId})
      if (!findOneArch) {
        throw new Err1000(SectionsErrorsEnum.ARCH, ErrorType.VALIDATION_ERROR, JSON.stringify(ArchError.ARCH_NOT_FOUND))
      }
      const findOneAsset = await this.assetRepository.findOne({_id : updateCryptoDto.assetId})
      if (!findOneAsset) {
        throw new Err1000(SectionsErrorsEnum.ASSET, ErrorType.VALIDATION_ERROR, JSON.stringify(AssetError.ASSET_NOT_FOUND))
      }
      const updateCryptoMongoMapper = new UpdateCryptoMongoMapper(updateCryptoDto)
      const resultCrypto =  await this.cryptoRepository.findOneAndUpdate({_id : cryptoId} , updateCryptoMongoMapper ,[FieldsMongoEnum.UPDATED_AT])
      if (!resultCrypto) {
        throw new Err1000(SectionsErrorsEnum.CRYPTO, ErrorType.VALIDATION_ERROR, JSON.stringify(CryptoError.CRYPTO_NOT_FOUND))
      }
      const paginateCryptoRMapper = new PaginateCryptoRMapper(findOneAsset , resultCrypto)
      return paginateCryptoRMapper
    } catch (e) {
      this.throwService.handelError(e ,SectionsErrorsEnum.CRYPTO)
    }
  }

  async getCrypto(cryptoId : string ) {
    try {
      const resultCrypto =  await this.cryptoRepository.findOne({_id : cryptoId} ,[FieldsMongoEnum.UPDATED_AT])
      if (!resultCrypto) {
        throw new Err1000(SectionsErrorsEnum.CRYPTO, ErrorType.VALIDATION_ERROR, JSON.stringify(CryptoError.CRYPTO_NOT_FOUND))
      }
      const findOneAsset = await this.assetRepository.findOne({_id : resultCrypto.assetId})
      const paginateCryptoRMapper = new PaginateCryptoRMapper(findOneAsset , resultCrypto)
      return paginateCryptoRMapper
    } catch (e) {
      this.throwService.handelError(e ,SectionsErrorsEnum.CRYPTO)
    }
  }
  async deleteCrypto(cryptoId : string) :Promise<DeleteResponseDto> {
    try {
      const deleteResult =  await this.cryptoRepository.deleteOne({ _id : cryptoId })
      if (deleteResult.deletedCount==0) {
        throw new Err1000(SectionsErrorsEnum.CRYPTO, ErrorType.VALIDATION_ERROR, JSON.stringify(CryptoError.CRYPTO_NOT_FOUND))
      }
      return {
        status : true
      }
    } catch (e) {
      this.throwService.handelError(e ,SectionsErrorsEnum.CRYPTO)
    }
  }

}
