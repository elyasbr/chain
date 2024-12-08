import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { SpeedWithdraw, SpeedWithdrawSchema } from '@app/common/dataBase/mongo/schemas/speed-withdraw.schema';
import { SpeedWithdrawService } from './speed-withdraw.service';
import { SpeedWithdrawRepository } from '@app/common/dataBase/mongo/repositories/speed-withdraw.repository';

@Module({
  imports :[
    MongooseModule.forFeature([
      { name: SpeedWithdraw.name, schema: SpeedWithdrawSchema  } ,


    ])
    ],
  providers :[
    SpeedWithdrawService , SpeedWithdrawRepository
  ]  ,
  exports :[SpeedWithdrawService ]

})
export class SpeedWithdrawModule {

}