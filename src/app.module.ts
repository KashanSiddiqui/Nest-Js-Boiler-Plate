import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from "./products/product.module";
import { StripeModule } from "./stripe/stripe.module";
import { NodemailerModule } from "./nodemailer/nodemailer.module";
import { AuthModule } from "./auth/auth.module";
import { PaypalModule } from "./paypal/paypal.module";
import { KrakenModule } from "./kraken/kraken.module";
import { TransactionsModule } from "./transactions/transactions.module";

@Module({
  imports: [
    MulterModule.register({
      dest: "./uploads",
    }),
    TransactionsModule,
    ProductModule,
    StripeModule,
    NodemailerModule,
    PaypalModule,
    AuthModule,
    KrakenModule,
    MongooseModule.forRoot(""),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
