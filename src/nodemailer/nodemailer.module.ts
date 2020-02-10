import { Module } from '@nestjs/common';
// import {MongooseModule} from '@nestjs/mongoose'

import { NodemailerController } from './nodemailer.controller';
import { NodemailerService } from './nodemailer.service';
import { ConfigModule } from '@nestjs/config';
// import { ProductSchema } from './product.model';

@Module({
  imports: [ConfigModule],
  controllers: [NodemailerController],
  providers: [NodemailerService],
})
export class NodemailerModule {}
