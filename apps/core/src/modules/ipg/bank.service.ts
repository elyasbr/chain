import { Injectable } from '@nestjs/common';
import { ThrowService } from '@elyasbr/throw/dist/src';
import { ArchError, BankError, ChainError, IpgError, StructError } from '@elyasbr/tools-chain/dist/src';
import { BankRepository } from '@app/common/dataBase/mongo/repositories/bank.repository';
import { CreateBankMongoMapper } from './mapper/bank/create-bank-mongo.mapper';
import { CreateBankDto } from './dtos/bank/create-bank.dto';
import { UpdateBankDto } from './dtos/bank/update-bank.dto';
import { UpdateBankMongoMapper } from './mapper/bank/update-bank-mongo.mapper';
import { FilterBankDto } from './dtos/bank/filter-bank.dto';
import { Bank } from '@app/common/dataBase/mongo/schemas/bank.schema';
import { PaginateDto } from '@elyasbr/public/dist/src/dtos/paginate.dto';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { DeleteResponseDto } from '@elyasbr/public/dist/src';
import { PaginateBankRMapper } from './rmapper/bank/paginate-bank-r.mapper';

@Injectable()
export class BankService {
  constructor( public bankRepository : BankRepository ,

               public throwService : ThrowService) {
  }
  async createBank(createBankDto : CreateBankDto) {
    try {
      const createBankMongoMapper = new CreateBankMongoMapper(createBankDto)
      const resultBank = await this.bankRepository.create(createBankMongoMapper,[FieldsMongoEnum.UPDATED_AT])
     return  this.bankRepository.changeField(resultBank ,[{key : "_id" , value : "bankId"}])
    } catch (e) {
        this.throwService.handelError(e)
    }


  }
  async updateBank(bankId : string , updateBankDto : UpdateBankDto) {
    try {
      const updateBankMongoMapper = new UpdateBankMongoMapper(updateBankDto)
      const resultBank =  await this.bankRepository.findOneAndUpdate({_id : bankId} , updateBankMongoMapper,[FieldsMongoEnum.UPDATED_AT])
      if (!resultBank) {
        throw new Error(JSON.stringify(BankError.BANK_NOT_FOUND))
      }
      return  this.bankRepository.changeField(resultBank ,[{key : "_id" , value : "bankId"}])

    } catch (e) {
      this.throwService.handelError(e)
    }
  }

  async getBank(bankId : string ) {
    try {
      const resultBank =  await this.bankRepository.findOne({_id : bankId} , [FieldsMongoEnum.UPDATED_AT] )
      if (!resultBank) {
        throw new Error(JSON.stringify(BankError.BANK_NOT_FOUND))
      }
      return  this.bankRepository.changeField(resultBank ,[{key : "_id" , value : "bankId"}])
    } catch (e) {
      this.throwService.handelError(e)
    }
  }
  async deleteBank(bankId : string):Promise<DeleteResponseDto> {
    try {
      const deleteResult =  await this.bankRepository.deleteOne({ _id : bankId })
      if (deleteResult.deletedCount==0) {
        throw new Error(JSON.stringify(BankError.BANK_NOT_FOUND))
      }
      return  {
        status : true
      }

    } catch (e) {
      this.throwService.handelError(e)
    }
  }
  async getPagination(filterBankDto : FilterBankDto):Promise<PaginateDto<PaginateBankRMapper>> {
   try {
     const resultBank =  await this.bankRepository.find(filterBankDto.filter  ,[FieldsMongoEnum.UPDATED_AT],
       {  } ,{
       skip : (filterBankDto.page - 1) * filterBankDto.limit ,
       limit : filterBankDto.limit ,
       sort : [{"id" : 1}]
     })
     const count =this.bankRepository.getCountDocuments()
     const result = await this.bankRepository.changeFieldArray(resultBank ,[{key :"_id" , value : "bankId"}])
     return new PaginateDto<PaginateBankRMapper>(result ,filterBankDto.page , filterBankDto.limit , Number(count) )
   } catch (e) {
     this.throwService.handelError(e)
   }
  }
}
