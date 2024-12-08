import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreatedObjectResponse,
  ApiOkObjectResponse,
  DeleteResponseDto,
  ResponseInterceptor,
} from '@elyasbr/public/dist/src';
import { CryptoService } from '../modules/asset/crypto.service';
import { CreateCryptoDto } from '../modules/asset/dtos/crypto/create-crypto.dto';
import { UpdateCryptoDto } from '../modules/asset/dtos/crypto/update-crypto.dto';
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import {  GetCryptoRMapper } from '../modules/asset/rmapper/crypto/get-crypto-r.mapper';
import { PaginateCryptoRMapper } from '../modules/asset/rmapper/crypto/paginate-crypto-r.mapper';
import { RewardDepositService } from '../modules/asset/reward-deposit.service';
import { CreateRewardDepositDto } from '../modules/asset/dtos/reward-deposit/create-reward-deposit.dto';
import { FilterRewardDepositDto } from '../modules/asset/dtos/reward-deposit/filter-reward-deposit.dto';
import { PaginateRewardDepositRMapper } from '../modules/asset/rmapper/reward-deposit/paginate-reward-deposit-r.mapper';

@Controller({
  path : "blockchain/reward-deposit" ,
  version : "1"
})
@ApiTags("Reward Asset")
@ApiValidationRequest()
@ApiForbiddenRequest()
export class RewardDepositController {
  constructor(private readonly rewardDepositService: RewardDepositService) {}

  @Post("/")
  @ApiCreatedObjectResponse(PaginateCryptoRMapper)
  createRewardDeposit(@Body() createRewardDepositDto : CreateRewardDepositDto) {
    return this.rewardDepositService.createRewardDeposit(createRewardDepositDto)
  }
  @Post("/paginate/:cryptoId")
  @ApiOkObjectResponse(PaginateRewardDepositRMapper)
  getPaginationRewardDeposit( @Param('cryptoId')  cryptoId : string  , @Body() filterRewardDepositDto : FilterRewardDepositDto) {
    return this.rewardDepositService.getPaginationRewardDeposit(cryptoId , filterRewardDepositDto )
  }
  @Delete("/:rewardDepositId")
  @ApiOkObjectResponse(DeleteResponseDto)
  removeRewardDeposit( @Param('rewardDepositId')  rewardDepositId : string ) {
    return this.rewardDepositService.deleteRewardDeposit(rewardDepositId )
  }






}
