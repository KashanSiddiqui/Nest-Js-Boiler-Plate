import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSchema } from './auth.model';

@Module({
  imports: [MongooseModule.forFeature([{name:'Auth',schema:AuthSchema}])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
