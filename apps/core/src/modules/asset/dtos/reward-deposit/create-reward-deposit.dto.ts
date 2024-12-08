import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeAsset } from '@app/common/enums/type-asset.enum';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { Prop } from '@nestjs/mongoose';
import {
  Allow,
  IS_DATE,
  IsBoolean,
  IsDate,
  IsDateString, IsEmpty,
  IsEnum, IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { AssetError, RewardDepositError } from '@elyasbr/tools-chain/dist/src';
import { Type } from 'class-transformer';
import { GroupAssetEnum } from '@app/common/enums/group-asset.enum';

export class CreateRewardDepositDto {
  @ApiProperty()
  @Allow()
  @IsMongoId({
    message : JSON.stringify(RewardDepositError.PATTERN_CRYPTO_ID_IS_WRONG)
  })
  cryptoId : string

  @ApiProperty()
  @Allow()
  @IsMongoId({
    message : JSON.stringify(RewardDepositError.PATTERN_ASSET_ID_IS_WRONG)
  })
  assetId : string

  @ApiProperty()
  @Allow()
  @IsNumber({} ,{
    message : JSON.stringify(RewardDepositError.AMOUNT_FIELD_REWARD_DEPOSIT_IS_REQUIRED)
  })
  amount : number


  @ApiProperty()
  @Allow()
  @IsBoolean({
    message : JSON.stringify(RewardDepositError.STATUS_FIELD_REWARD_DEPOSIT_IS_REQUIRED)
  })
  status :Boolean
}