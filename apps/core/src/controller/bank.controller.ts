import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiCreatedObjectResponse,
  ApiOkObjectResponse,
  DeleteResponseDto,
  ResponseInterceptor,
} from '@elyasbr/public/dist/src';
import { BankService } from '../modules/ipg/bank.service';
import { CreateBankDto } from '../modules/ipg/dtos/bank/create-bank.dto';
import { UpdateBankDto } from '../modules/ipg/dtos/bank/update-bank.dto';
import { FilterBankDto } from '../modules/ipg/dtos/bank/filter-bank.dto';
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import { GetBankRMapper } from '../modules/ipg/rmapper/bank/get-bank-r.mapper';
import { PaginateBankRMapper } from '../modules/ipg/rmapper/bank/paginate-bank-r.mapper';

@Controller({
  path : "blockchain/bank" ,
  version : "1"
})
@ApiTags("Bank")
@ApiValidationRequest()
@ApiForbiddenRequest()
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post("/")
  @ApiOperation({summary : "Create Bank"})
  @ApiCreatedObjectResponse(PaginateBankRMapper)
  createBank(@Body() createBankDto : CreateBankDto) {
    return this.bankService.createBank(createBankDto)
  }

  @Put("/:bankId")
  @ApiOperation({summary : "Update Bank"})
  @ApiOkObjectResponse(PaginateBankRMapper)
  updateBank( @Param('bankId')  bankId : string ,@Body() updateBankDto : UpdateBankDto) {
    return this.bankService.updateBank(bankId ,updateBankDto)
  }

  @Get("/:bankId")
  @ApiOperation({summary : "Get Bank"})
  @ApiOkObjectResponse(GetBankRMapper)
  getBank( @Param('bankId')  bankId : string ) {
    return this.bankService.getBank(bankId )
  }

  @Delete("/:bankId")
  @ApiOperation({deprecated :false , summary : "Delete Bank" })
  @ApiOkObjectResponse(DeleteResponseDto)
  deleteBank( @Param('bankId')  bankId : string ) {
    return this.bankService.deleteBank(bankId )
  }

  @Post("/pagination")
  @ApiOperation({deprecated :false , summary : "Pagination Bank" })
  @ApiCreatedObjectResponse(PaginateBankRMapper)
  getPagination(@Body() filterBankDto : FilterBankDto) {
    return this.bankService.getPagination(filterBankDto)
  }

}
