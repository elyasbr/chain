import { Injectable } from '@nestjs/common';
import { ThrowService } from '@elyasbr/throw/dist/src';
import { BankError, CountryError, CryptoError, IpgError } from '@elyasbr/tools-chain/dist/src';

import { CountryRepository } from '@app/common/dataBase/mongo/repositories/country.repository';
import { CreateCountryDto } from './dtos/country/create-country.dto';
import { CreateCountryMongoMapper } from './mapper/country/create-country-mongo.mapper';
import { UpdateCountryDto } from './dtos/country/update-country.dto';
import { UpdateCountryMongoMapper } from './mapper/country/update-country-mongo.mapper';
import { FilterCountryDto } from './dtos/country/filter-country.dto';
import { BankRepository } from '@app/common/dataBase/mongo/repositories/bank.repository';
import { CountryRlBankRepository } from '@app/common/dataBase/mongo/repositories/country-rl-bank.repository';
import { CreateCountryBankDto } from './dtos/country/create-country-bank.dto';
import { CreateCountryBankMongoMapper } from './mapper/country/create-country-bank-mongo.mapper';
import { CreateCountryBankRlCryptoDto } from './dtos/country/create-country-bank-rl-crypto.dto';
import { CryptoRepository } from '@app/common/dataBase/mongo/repositories/crypto.repository';
import { CreateCountryBankCryptoMongoMapper } from './mapper/country/create-country-bank-crypto-mongo.mapper';
import {
  CountryBankRlCryptoRepository,
} from '@app/common/dataBase/mongo/repositories/country-bank-rl-crypto.repository';
import { CreateCountryBankCryptoIpgMongoMapper } from './mapper/country/create-country-bank-crypto-ipg-mongo.mapper';
import { CreateCountryBankCryptoRlIpgDto } from './dtos/country/create-country-bank-crypto-rl-ipg.dto';
import { IpgRepository } from '@app/common/dataBase/mongo/repositories/ipg.repository';
import {
  CountryBankCryptoRlIpgRepository,
} from '@app/common/dataBase/mongo/repositories/country-bank-crypto-rl-ipg.repository';
import { PaginateDto } from '@elyasbr/public/dist/src/dtos/paginate.dto';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { DeleteResponseDto } from '@elyasbr/public/dist/src';
import { PaginateCountryRMapper } from './rmapper/country/paginate-country-r.mapper';
import { FilterCountryBankDto } from './dtos/country/filter-country-bank.dto';
import { PaginateCountryBankRMapper } from './rmapper/country/paginate-country-bank-r.mapper';
import { ArchRepository } from '@app/common/dataBase/mongo/repositories/arch.repository';
import { AssetRepository } from '@app/common/dataBase/mongo/repositories/asset.repository';
import { PaginateCountryBankRlCrypto } from './rmapper/country/paginate-country-bank-rl-crypto';
import { FilterCountryBankRlCryptoDto } from './dtos/country/filter-country-bank-rl-crypto.dto';
import { PaginateCountryBankCryptoRlIpgRMapper } from './rmapper/country/paginate-country-bank-crypto-rl-ipg-r.mapper';
import { FilterCountryBankCryptoRlIpgDto } from './dtos/country/filter-country-bank-crypto-rl-ipg.dto';
import { SectionsErrorsEnum } from '@elyasbr/throw/dist/src/enums/sections-errors.enum';
import { Err1000, ErrorType } from '@elyasbr/throw/dist/src/err';

@Injectable()
export class CountryService {
  countryId = "countryId"
  constructor( public countryRepository : CountryRepository ,
               public bankRepository : BankRepository ,
               public archRepository : ArchRepository ,
               public assetRepository : AssetRepository ,

               public countryRlBankRepository : CountryRlBankRepository ,
               public countryBankRlCryptoRepository : CountryBankRlCryptoRepository ,
               public ipgRepository : IpgRepository ,
               public countryBankCryptoRlIpgRepository : CountryBankCryptoRlIpgRepository ,
               public cryptoRepository : CryptoRepository ,
               public throwService : ThrowService) {
  }
  async createCountry(createCountryDto : CreateCountryDto) {
    try {
      const createCountryMongoMapper = new CreateCountryMongoMapper(createCountryDto)
      const resultCountry =await this.countryRepository.create(createCountryMongoMapper,[FieldsMongoEnum.UPDATED_AT])
      return  this.countryRepository.changeField(resultCountry , [{key :"_id" , value : this.countryId}])
    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }


  }
  async updateCountry(countryId : string , updateCountryDto : UpdateCountryDto) {
    try {
      const updateCountryMongoMapper = new UpdateCountryMongoMapper(updateCountryDto)
      const resultCountry =  await this.countryRepository.findOneAndUpdate({_id : countryId} , updateCountryMongoMapper , [FieldsMongoEnum.UPDATED_AT])
      if (!resultCountry) {
        throw new Err1000(SectionsErrorsEnum.COUNTRY, ErrorType.VALIDATION_ERROR, JSON.stringify(CountryError.COUNTRY_NOT_FOUND))
      }
      return  this.countryRepository.changeField(resultCountry , [{key :"_id" , value : this.countryId}])

    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }


  }

  async getCountry(ipgId : string ) {
    try {
      const resultCountry =  await this.countryRepository.findOne({_id : ipgId} ,[FieldsMongoEnum.UPDATED_AT] )
      if (!resultCountry) {
        throw new Err1000(SectionsErrorsEnum.COUNTRY, ErrorType.VALIDATION_ERROR, JSON.stringify(CountryError.COUNTRY_NOT_FOUND))
      }
      return  this.countryRepository.changeField(resultCountry , [{key :"_id" , value : this.countryId}])

    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }


  }
  async deleteCountry(countryId : string) :Promise<DeleteResponseDto> {
    try {
      const deleteResult =  await this.countryRepository.deleteOne({ _id : countryId  })
      if (deleteResult.deletedCount==0) {
        throw new Err1000(SectionsErrorsEnum.COUNTRY, ErrorType.VALIDATION_ERROR, JSON.stringify(CountryError.COUNTRY_NOT_FOUND))
      }
      return {
        status : true
      }

    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }
  }
  async getPagination(filterCountryDto : FilterCountryDto):Promise<PaginateDto<PaginateCountryRMapper>> {
    try {
      const resultCrypto =  await this.countryRepository.find(filterCountryDto.filter  ,
        [FieldsMongoEnum.UPDATED_AT],{  } ,{
        skip : (filterCountryDto.page - 1) * filterCountryDto.limit ,
        limit : filterCountryDto.limit ,
        sort : [{"id" : 1}]

      })
      const result = await this.countryRepository.changeFieldArray(resultCrypto , [{key : "_id" , value : this.countryId}])
      const count = this.countryRepository.getCountDocuments()
      return new PaginateDto<PaginateCountryRMapper>(result ,filterCountryDto.page , filterCountryDto.limit , Number(count) )
    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }
  }
  async getPaginationBankFromCountry(countryId :string ,filterCountryBankDto : FilterCountryBankDto):Promise<PaginateDto<PaginateCountryBankRMapper>> {
    try {
      const {filter} = filterCountryBankDto
      const findCountryRlBank =  await this.countryRlBankRepository.find({countryId :countryId , ...filter}  ,
        [FieldsMongoEnum.UPDATED_AT],{  } ,{
          skip : (filterCountryBankDto.page - 1) * filterCountryBankDto.limit ,
          limit : filterCountryBankDto.limit ,
          sort : [{"id" : 1}]

        })
      const mapBanks:string[] =findCountryRlBank.map((item)=>item.bankId)
      const findBanks = await this.bankRepository.find({ _id : { $in : mapBanks}} ,[],{} , {})
      const count =this.countryRlBankRepository.getCountDocuments()
      const banks : PaginateCountryBankRMapper[] =[]
      findBanks.forEach((item , index)=>{
        const row =findCountryRlBank.find((itemRl)=>itemRl.bankId==item._id.toString())
        banks.push(new PaginateCountryBankRMapper(row , item))

      })
      return new PaginateDto<PaginateCountryBankRMapper>(banks ,filterCountryBankDto.page , filterCountryBankDto.limit , Number(count) )
    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }
  }

  async addBankToCountry(createCountryBankDto : CreateCountryBankDto) :Promise<PaginateCountryBankRMapper> {
    try {
      const  resultCountry = await this.countryRepository.findOne({_id : createCountryBankDto.countryId})
      if (!resultCountry) {
        throw new Err1000(SectionsErrorsEnum.COUNTRY, ErrorType.VALIDATION_ERROR, JSON.stringify(CountryError.COUNTRY_NOT_FOUND))
      }
      const  resultBank = await this.bankRepository.findOne({_id : createCountryBankDto.bankId})
      if (!resultBank) {
        throw new Err1000(SectionsErrorsEnum.COUNTRY, ErrorType.VALIDATION_ERROR, JSON.stringify(BankError.BANK_NOT_FOUND))
      }
      const createCountryBankMongoMapper = new CreateCountryBankMongoMapper(createCountryBankDto)
      const resultCountryLBank = await this.countryRlBankRepository.create(createCountryBankMongoMapper,
        [FieldsMongoEnum.UPDATED_AT] ,[] )

      return new PaginateCountryBankRMapper(resultCountryLBank , resultBank)
    } catch (e) {
      console.log(e)
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }
  }
  async removeBankToCountry(countryBankId : string) :Promise<DeleteResponseDto> {
    try {
      const deleteResult =  await this.countryRlBankRepository.deleteOne({ _id : countryBankId  })
      if (deleteResult.deletedCount==0) {
        throw new Err1000(SectionsErrorsEnum.COUNTRY, ErrorType.VALIDATION_ERROR, JSON.stringify(CountryError.COUNTRY_BANK_NOT_FOUND))
      }
      return {
        status : true
      }
    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }
  }

  async addCryptoToCountryBank( createCountryBankRlCryptoDto : CreateCountryBankRlCryptoDto): Promise<PaginateCountryBankRlCrypto>   {
    try {
      const  resultCountryBank = await this.countryRlBankRepository.findOne({_id : createCountryBankRlCryptoDto.countryBankId})
      if (!resultCountryBank) {
        throw new Err1000(SectionsErrorsEnum.COUNTRY, ErrorType.VALIDATION_ERROR, JSON.stringify(CountryError.COUNTRY_BANK_NOT_FOUND))
      }
      const  resultCrypto = await this.cryptoRepository.findOne({_id : createCountryBankRlCryptoDto.cryptoId})
      if (!resultCrypto) {
        throw new Err1000(SectionsErrorsEnum.CRYPTO, ErrorType.VALIDATION_ERROR, JSON.stringify(CryptoError.CRYPTO_NOT_FOUND))
      }
      const createCountryBankCryptoMongoMapper = new CreateCountryBankCryptoMongoMapper(createCountryBankRlCryptoDto)
      const  resultCountryBankRlCrypto = await this.countryBankRlCryptoRepository.create(createCountryBankCryptoMongoMapper,[FieldsMongoEnum.UPDATED_AT])
      const resultArch = await this.archRepository.findOne({_id : resultCrypto.archId})
      const resultAsset = await this.assetRepository.findOne({_id : resultCrypto.assetId})
      return new PaginateCountryBankRlCrypto(resultArch , resultAsset ,resultCrypto ,resultCountryBankRlCrypto)
    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }
  }

  async removeCryptoFromCountryBank(countryBankCryptoId : string) : Promise<DeleteResponseDto> {
    try {
      const deleteResult =  await this.countryBankRlCryptoRepository.deleteOne({ _id : countryBankCryptoId  })
      if (deleteResult.deletedCount==0) {
        throw new Err1000(SectionsErrorsEnum.COUNTRY, ErrorType.VALIDATION_ERROR, JSON.stringify(CountryError.COUNTRY_BANK_CRYPTO_NOT_FOUND))
      }
      return {
        status : true
      }
    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }
  }
  async getPaginationCryptoFromCountryBank(countryBankId :string ,filterCountryBankRlCryptoDto : FilterCountryBankRlCryptoDto):Promise<PaginateDto<PaginateCountryBankRlCrypto>> {
    try {
      const {filter} = filterCountryBankRlCryptoDto
      const findCountryBankRlCrypto =  await this.countryBankRlCryptoRepository.find({countryBankId :countryBankId , ...filter}  ,
        [FieldsMongoEnum.UPDATED_AT],{  } ,{
          skip : (filterCountryBankRlCryptoDto.page - 1) * filterCountryBankRlCryptoDto.limit ,
          limit : filterCountryBankRlCryptoDto.limit ,
          sort : [{"id" : 1}]
        })
      const cryptos : string[] = findCountryBankRlCrypto.map((item , index )=> item.cryptoId)
      const findCrypto = await this.cryptoRepository.find({_id : {$in : cryptos}} ,[])
      const archs = findCrypto.map((item)=>item.archId)
      const assets = findCrypto.map((item)=>item.assetId)
      const findArch = await this.archRepository.find({_id : { $in : archs }})
      const findAsset =await this.assetRepository.find({_id : { $in : assets }})
      const final:PaginateCountryBankRlCrypto[] = []
      for (const item of findCountryBankRlCrypto) {
        const crypto = findCrypto.find((itemCrypto)=> itemCrypto._id.toString()==item.cryptoId)
        const arch = findArch.find((itemArch)=> itemArch._id.toString()==crypto.archId)
        const asset = findAsset.find((itemAsset)=> itemAsset._id.toString()==crypto.assetId)
        final.push(new PaginateCountryBankRlCrypto(arch , asset , crypto ,item))
      }
      const count =await this.countryBankRlCryptoRepository.getCountDocuments()
      return new PaginateDto<PaginateCountryBankRlCrypto>(final ,filterCountryBankRlCryptoDto.page , filterCountryBankRlCryptoDto.limit , Number(count) )
    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }
  }
  async addIpgToCountryBankCrypto(createCountryBankCryptoRlIpgDto : CreateCountryBankCryptoRlIpgDto) :Promise<PaginateCountryBankCryptoRlIpgRMapper> {
    try {
      const  resultCountry = await this.countryBankRlCryptoRepository.findOne({_id : createCountryBankCryptoRlIpgDto.countryBankCryptoId})
      if (!resultCountry) {
        throw new Err1000(SectionsErrorsEnum.CRYPTO, ErrorType.VALIDATION_ERROR, JSON.stringify(CountryError.COUNTRY_BANK_CRYPTO_NOT_FOUND))
      }
      const  resultIpg = await this.ipgRepository.findOne({_id : createCountryBankCryptoRlIpgDto.ipgId})
      if (!resultIpg) {
        throw new Err1000(SectionsErrorsEnum.IPG, ErrorType.VALIDATION_ERROR, JSON.stringify(IpgError.IPG_NOT_FOUND))
      }
      const createCountryBankCryptoIpgMongoMapper = new CreateCountryBankCryptoIpgMongoMapper(createCountryBankCryptoRlIpgDto)
      const createCountryBankCryptoRlIpg = await this.countryBankCryptoRlIpgRepository.create(createCountryBankCryptoIpgMongoMapper,[FieldsMongoEnum.UPDATED_AT])
      return new PaginateCountryBankCryptoRlIpgRMapper(resultIpg, createCountryBankCryptoRlIpg)
    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }
  }

  async removeIpgFromCountryBankCrypto(countryBankCryptoIpg : string) : Promise<DeleteResponseDto> {
    try {
      const deleteResult =  await this.countryBankCryptoRlIpgRepository.deleteOne({ _id : countryBankCryptoIpg  })
      if (deleteResult.deletedCount==0) {
        throw new Err1000(SectionsErrorsEnum.COUNTRY, ErrorType.VALIDATION_ERROR, JSON.stringify(CountryError.COUNTRY_BANK_CRYPTO_IPG_NOT_FOUND))
      }
      return {
        status : true
      }
    } catch (e) {
      this.throwService.handelError(e ,SectionsErrorsEnum.IPG)
    }
  }

  async getPaginationIpgFromCountryBankCrypto(countryBankCryptoId :string ,filterCountryBankCryptoRlIpgDto : FilterCountryBankCryptoRlIpgDto):Promise<PaginateDto<PaginateCountryBankCryptoRlIpgRMapper>> {
    try {
      const {filter} = filterCountryBankCryptoRlIpgDto
      const findCountryBankCryptoRlIpg =  await this.countryBankCryptoRlIpgRepository
        .find({countryBankCryptoId :countryBankCryptoId , ...filter}  ,
        [FieldsMongoEnum.UPDATED_AT],{  } ,{
          skip : (filterCountryBankCryptoRlIpgDto.page - 1) * filterCountryBankCryptoRlIpgDto.limit ,
          limit : filterCountryBankCryptoRlIpgDto.limit ,
          sort : [{"id" : 1}]
        })
      const ipgs : string[] = findCountryBankCryptoRlIpg.map((item , index )=> item.ipgId)
      const findIpg = await this.ipgRepository.find({_id : {$in : ipgs}} ,[])
      const final:PaginateCountryBankCryptoRlIpgRMapper[] = []
      for (let findOneCountryBankCryptoRlIpg of findCountryBankCryptoRlIpg){
        const row=findIpg.find((item)=>item._id.toString()==findOneCountryBankCryptoRlIpg.ipgId)
        final.push(new PaginateCountryBankCryptoRlIpgRMapper(row , findOneCountryBankCryptoRlIpg))
      }
      const count =await this.countryBankRlCryptoRepository.getCountDocuments()
      return new PaginateDto<PaginateCountryBankCryptoRlIpgRMapper>(final ,filterCountryBankCryptoRlIpgDto.page , filterCountryBankCryptoRlIpgDto.limit , Number(count) )
    } catch (e) {
      this.throwService.handelError(e , SectionsErrorsEnum.COUNTRY)
    }
  }
}
