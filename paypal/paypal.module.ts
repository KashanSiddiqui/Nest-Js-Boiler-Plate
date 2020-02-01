import { Module } from '@nestjs/common';
// import {MongooseModule} from '@nestjs/mongoose'

import { PaypalController } from './paypal.controller';
import { PaypalService } from './paypal.service';
// import { ProductSchema } from './product.model';

@Module({
  imports: [],
  controllers: [PaypalController],
  providers: [PaypalService],
})
export class PaypalModule {}
