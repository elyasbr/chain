import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Allow, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {  SpeedWithdrawError } from '@elyasbr/tools-chain/dist/src';


export class UpdateSpeedWithdrawDto {
  @ApiProperty()
  @IsString({
    message : JSON.stringify(SpeedWithdrawError.SLUG_FIELD_SPEED_WITHDRAW_IS_REQUIRED)
  })
  @IsNotEmpty({
    message : JSON.stringify(SpeedWithdrawError.SLUG_FIELD_SPEED_WITHDRAW_IS_EMPTY)
  })
  slug : string

  @ApiProperty()
  @IsNumber({} ,{
    message : JSON.stringify(SpeedWithdrawError.RATE_WITHDRAW_FIELD_SPEED_WITHDRAW_IS_REQUIRED)
  })
  rateWithdraw : number

  @ApiProperty()
  @Allow()
  description : string

  @ApiProperty()
  @IsBoolean({
    message : JSON.stringify(SpeedWithdrawError.STATUS_FIELD_SPEED_WITHDRAW_IS_REQUIRED)
  })
  status :Boolean
}