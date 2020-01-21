import { Controller, Post, Body, Param} from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly StripeService: StripeService) {}

  @Post()
  async stripePayment(@Body() obj:Object) {
    //   console.log(producTitle,productDescription,productPrice,"Firsttt")
    try{
        const res= await this.StripeService.createPayment(obj);
        return {result:res}

    }
    catch(error){
        return error
    }
}

    
}
