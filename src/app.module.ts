import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { StripeModule } from './stripe/stripe.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { AuthModule } from './auth/auth.module';
import { PaypalModule } from './paypal/paypal.module';
import { KrakenModule } from './kraken/kraken.module';



@Module({
  imports: [
    ProductModule,
    StripeModule,
    NodemailerModule,
    PaypalModule,
    AuthModule,
    KrakenModule,
    MongooseModule.forRoot('mongodb+srv://hasanrasheed:Pass123456@cluster0-0kmmw.mongodb.net/test?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
