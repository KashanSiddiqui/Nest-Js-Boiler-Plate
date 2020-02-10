import { Controller, Post, Body, Param, Get} from '@nestjs/common';
import { StripeService } from './stripe.service';

//request execute payment
@Controller('stripe')
export class StripeController {
  constructor(private readonly StripeService: StripeService) {}

  @Post()
  async stripePayment(@Body() obj:Object) {
    try{
        const res= await this.StripeService.createPayment(obj);
        return {responseCode:res[0],result:res[1]}

    }
    catch(error){
        return error
    }
}

//get stripe supported currencies
@Get('/getCurrencies')
  async getCurrency() {
    try{
        const res= await this.StripeService.getListOfCurrencies();
        return {responseCode:res[0],result:res[1]}

    }
    catch(error){
        return error
    }
}

    
}
