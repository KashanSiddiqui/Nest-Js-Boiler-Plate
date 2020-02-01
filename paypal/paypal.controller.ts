import { Controller, Post, Body, Param, Get} from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly PaypalService: PaypalService) {}

  @Post('/createPayment')
  async paypalPayment(@Body() obj:Object) {
      console.log(obj,"firsssssst")
    //   console.log(producTitle,productDescription,productPrice,"Firsttt")
    try{
        const result:any= await this.PaypalService.createPayment(obj);
        console.log(result,"thirddd")
        if (result) {
            
            for (let i = 0; i < result.links.length; i++) {
                if (result.links[i].rel === 'approval_url') {
                    return {responseCode:200,result:result.links[i].href}
                }
            }
        }
        

    }
    catch(error){
        return error
    }
}

@Post('/success')
  async paypalPaymentSuccess(@Body() obj:Object) {
      console.log(obj,"firsssssst")
    //   console.log(producTitle,productDescription,productPrice,"Firsttt")
    try{
        const res= await this.PaypalService.executePayment(obj)
        console.log(res,"thirdd")
        return res

    }
    catch(error){
        console.log("error in payment",error.message)
        return error
    }
}

@Get('/cancel')
async cancelPayment(){
    return {responseCode:200}
}

@Get('/getCurrencies')
  async getCurrency() {
      console.log("firsssssst")
    //   console.log(producTitle,productDescription,productPrice,"Firsttt")
    try{
        const res= await this.PaypalService.getListOfCurrencies();
        return {responseCode:res[0],result:res[1]}

    }
    catch(error){
        return error
    }
}

    
}
