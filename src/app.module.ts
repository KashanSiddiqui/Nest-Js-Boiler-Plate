import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { StripeModule } from './stripe/stripe.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ProductModule,
    StripeModule,
    NodemailerModule,
    AuthModule,
    MongooseModule.forRoot("your mongodb connection string")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
