import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ArtController } from './art.controller';
import { ArtService } from './art.service';
import { ArtSchema } from './art.model';
import { CategorySchema } from '../category/category.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Art', schema: ArtSchema }, { name: 'Category', schema: CategorySchema }])],
  controllers: [ArtController],
  providers: [ArtService],
})
export class ArtModule { }