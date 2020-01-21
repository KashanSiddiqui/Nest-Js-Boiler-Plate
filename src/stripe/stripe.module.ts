import { Module } from '@nestjs/common';
// import {MongooseModule} from '@nestjs/mongoose'

import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
// import { ProductSchema } from './product.model';

@Module({
  imports: [],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
