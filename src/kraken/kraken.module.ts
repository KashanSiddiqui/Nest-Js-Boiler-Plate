import { Module } from '@nestjs/common';
// import {MongooseModule} from '@nestjs/mongoose'

import { KrakenController } from './kraken.controller';
import { KrakenService } from './kraken.service';
// import { ProductSchema } from './product.model';

@Module({
  imports: [],
  controllers: [KrakenController],
  providers: [KrakenService],
})
export class KrakenModule {}
