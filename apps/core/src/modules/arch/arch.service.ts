import { Injectable } from '@nestjs/common';
import { ThrowService } from '@elyasbr/throw/dist/src';
import { ArchError, ChainError } from '@elyasbr/tools-chain/dist/src';
import { ArchRepository } from '@app/common/dataBase/mongo/repositories/arch.repository';
import { CryptoRepository } from '@app/common/dataBase/mongo/repositories/crypto.repository';
import { AssetRepository } from '@app/common/dataBase/mongo/repositories/asset.repository';
import { CreateArchDto } from './dtos/create-arch.dto';
import { CreateArchMongoMapper } from './mapper/create-arch-mongo.mapper';
import { UpdateArchDto } from './dtos/update-arch.dto';
import { UpdateArchMongoMapper } from './mapper/update-arch-mongo.mapper';
import { FilterArchDto } from './dtos/filter-arch.dto';
import { FilterCryptoDto } from '../asset/dtos/crypto/filter-crypto.dto';
import { PaginateDto } from '@elyasbr/public/dist/src/dtos/paginate.dto';
import { ChainRepository } from '@app/common/dataBase/mongo/repositories/chain.repository';
import { DeleteResponseDto, JsonMethodUtl } from '@elyasbr/public/dist/src';
import { PaginateArchRMapper } from './rmapper/paginate-arch-r.mapper';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { PaginateCryptoRMapper } from '../asset/rmapper/crypto/paginate-crypto-r.mapper';
import { SectionsErrorsEnum } from '@elyasbr/throw/dist/src/enums/sections-errors.enum';
import { Err1000, ErrorType } from '@elyasbr/throw/dist/src/err';

@Injectable()
export class ArchService {
  archId = "archId"
  constructor( public archRepository : ArchRepository ,
               public chainRepository : ChainRepository ,
               public assetRepository : AssetRepository ,
               public cryptoRepository : CryptoRepository ,
               public throwService : ThrowService) {
  }
  async createArch(createArchDto : CreateArchDto) :Promise<CreateArchMongoMapper> {
    try {
      const getOneChain = await this.chainRepository.findOne({_id : createArchDto.chainId},[])
      if (!getOneChain) {
        throw new Err1000(SectionsErrorsEnum.CHAIN, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(ChainError.CHAIN_NOT_FOUND))
      }
      const createArchMongoMapper = new CreateArchMongoMapper(createArchDto)
      const createArch = await this.archRepository.create(createArchMongoMapper ,[FieldsMongoEnum.UPDATED_AT])
      return await JsonMethodUtl.changeField(createArch , [{key : "_id" , value : this.archId}])
    } catch (e) {

        this.throwService.handelError(e,SectionsErrorsEnum.ARCH)
    }


  }
  async updateArch(archId : string , updateArchDto : UpdateArchDto) {
    try {
      const getOneChain = await this.chainRepository.findOne({_id : updateArchDto.chainId})
      if (!getOneChain) {
        throw new Err1000(SectionsErrorsEnum.CHAIN, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(ChainError.CHAIN_NOT_FOUND))
      }
      const updateArchMongoMapper = new UpdateArchMongoMapper(updateArchDto)
      const getOneArch =  await this.archRepository.findOneAndUpdate({_id : archId} , updateArchMongoMapper,[FieldsMongoEnum.UPDATED_AT])
      if (!getOneArch) {
        throw new Err1000(SectionsErrorsEnum.ARCH, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(ArchError.ARCH_NOT_FOUND))
      }
      return JsonMethodUtl.changeField(getOneArch , [{key : "_id" , value : this.archId}])
    } catch (e) {
      this.throwService.handelError(e,SectionsErrorsEnum.ARCH)
    }
  }
  async getArch(archId : string ) {
    try {
      const getOneArch =  await this.archRepository.findOne({_id : archId} ,[FieldsMongoEnum.UPDATED_AT] )
      if (!getOneArch) {
        throw new Err1000(SectionsErrorsEnum.ARCH, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(ArchError.ARCH_NOT_FOUND))
      }
      return await JsonMethodUtl.changeField(getOneArch , [{key : "_id" , value : this.archId}])

    } catch (e) {
      this.throwService.handelError(e,SectionsErrorsEnum.ARCH)
    }


  }
  async deleteArch(archId : string):Promise<DeleteResponseDto> {
    try {
      const deleteArch =  await this.archRepository.deleteOne({ _id :archId })
      if (deleteArch.deletedCount==0) {
        throw new Err1000(SectionsErrorsEnum.ARCH, ErrorType.VALIDATION_SYSTEM_ERROR, JSON.stringify(ArchError.ARCH_NOT_FOUND))
      }
      return  {
        status : true
      }

    } catch (e) {
      this.throwService.handelError(e,SectionsErrorsEnum.ARCH)
    }
  }
  async getPagination(filterArchDto : FilterArchDto):Promise<PaginateDto<PaginateArchRMapper>> {
   try {
     const getArrayArch =  await this.archRepository.find(filterArchDto.filter  ,
       [FieldsMongoEnum.UPDATED_AT],{  } ,{
       skip : (filterArchDto.page - 1) * filterArchDto.limit ,
       limit : filterArchDto.limit ,
       sort : [{"id" : 1}]

     })
     const count = await this.archRepository.getCountDocuments()
     const result = JsonMethodUtl.changeFieldArray(getArrayArch ,[{ key : "_id" ,value :this.archId}])
     return new PaginateDto<PaginateArchRMapper>(result ,filterArchDto.page , filterArchDto.limit , Number(count) )
   } catch (e) {
     this.throwService.handelError(e,SectionsErrorsEnum.ARCH)
   }
  }
  async getPaginationCrypto(archId :  string ,filterCryptoDto:  FilterCryptoDto):Promise<PaginateDto<PaginateCryptoRMapper>> {
    try {
      const  {filter} =filterCryptoDto
      console.log({ ...filter ,
        archId : archId
      })
      const resultCrypto =  await this.cryptoRepository.find({ ...filter ,
        archId : archId
      } ,[],{  } ,{
        skip : (filterCryptoDto.page - 1) * filterCryptoDto.limit ,
        limit : filterCryptoDto.limit ,
        sort : [{"id" : 1}]
      })
      const assets = resultCrypto.map((item)=> item.assetId)
      const getArrayAsset = await this.assetRepository.find({ _id : { $in : assets}} ,[],{} , {})
      const final :PaginateCryptoRMapper[] =[]
      resultCrypto.forEach(item =>{
        const asset = getArrayAsset.find((asset)=> asset._id.toString()== item.assetId)
        if (asset) {
          const paginateCryptoRMapper = new PaginateCryptoRMapper(asset , item)
          final.push(paginateCryptoRMapper)
        }
      })
      const count = await this.cryptoRepository.getCountDocuments()
      return new PaginateDto<PaginateCryptoRMapper>(final ,filterCryptoDto.page , filterCryptoDto.limit , Number(count) )
    } catch (e) {

      this.throwService.handelError(e,SectionsErrorsEnum.ARCH)
    }
  }
}
