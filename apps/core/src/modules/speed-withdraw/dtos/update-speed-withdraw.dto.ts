import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Allow, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import {  SpeedWithdrawError } from '@elyasbr/tools-chain/dist/src';


export class UpdateSpeedWithdrawDto {
  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(SpeedWithdrawError.SLUG_FIELD_SPEED_WITHDRAW_IS_REQUIRED)
  })
  @IsNotEmpty({
    message : JSON.stringify(SpeedWithdrawError.SLUG_FIELD_SPEED_WITHDRAW_IS_EMPTY)
  })
  slug : string

  @ApiProperty()
  @Allow()
  description : string

  @ApiProperty()
  @Allow()
  @IsBoolean({
    message : JSON.stringify(SpeedWithdrawError.STATUS_FIELD_SPEED_WITHDRAW_IS_REQUIRED)
  })
  status :Boolean
}