import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './product.model';

@Module({
  imports: [MongooseModule.forFeature([{name:'Product',schema:ProductSchema}])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
