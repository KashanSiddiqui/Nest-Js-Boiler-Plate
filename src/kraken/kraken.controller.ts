import { Controller, Post, Body, Param} from '@nestjs/common';
import { KrakenService } from './kraken.service';

@Controller('kraken')
export class KrakenController {
  constructor(private readonly KrakenService: KrakenService) {}

  //request that returns 1btc amount of given currency
  @Post()
  async kraken(@Body('symbol') symbol:string ) {
    try{
        const res= await this.KrakenService.getTickerInformation(symbol)
        console.log(res)
        return {responseCode:res[0],result:res[1]}

    }
    catch(error){
        return error
    }
}

//request that returns canadian equivalent of given currrency
@Post('/getCurrency')
  async getCurrency(@Body('symbol') symbol:string,
  @Body('amount') amount:number
  ) {
    //   console.log(amount,symbol,"amount1")
    //   console.log(producTitle,productDescription,productPrice,"Firsttt")
    try{
        const res= await this.KrakenService.getCurrencyRate(amount,symbol)
        return {responseCode:res[0],result:res[1]}

    }
    catch(error){
        throw [404,error.message]
    }
}

//request to convert amount from canadian to other currencies
@Post('/getOtherCurrenciesRate')
  async getCurrencyRateOfAll(@Body('symbol') symbol:string
  ) {
    //   console.log(amount,symbol,"amount1")
    //   console.log(producTitle,productDescription,productPrice,"Firsttt")
    try{
        const res= await this.KrakenService.getCurrencyRateOfAll(1,symbol)
        return {responseCode:res[0],result:res[1]}

    }
    catch(error){
        throw [404,error.message]
    }
}

    
}
