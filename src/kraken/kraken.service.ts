import { Injectable, NotFoundException } from '@nestjs/common';
const axios = require('axios');
const KrakenClient = require('kraken-api');
const kraken = new KrakenClient("add keys here");

@Injectable()
export class KrakenService {
    // products: Product[] = [];

    constructor(){}
    getTickerInformation = async (symbol) => {
        try {

            
            let info = await kraken.api('Ticker', {pair: 'XXBTZUSD'})
            // console.log(info.result['XXBTZUSD'].a[0], 'ask price')
            let url = `https://currency13.p.rapidapi.com/convert/${info.result['XXBTZUSD'].a[0]}/USD/${symbol}`
            let header = {
                "x-rapidapi-host": "currency13.p.rapidapi.com",
                "x-rapidapi-key": "key here"
            }
            let result = await axios.get(url, {params: {}, headers: header})
            console.log(result.data,"price")
            // console.log(result.data, 'amount',result)
            const fiat= await this.getCurrencyRate(1,symbol)
            const obj={cryptoAmount:result.data.amount,fiatAmount:fiat[1]}
            return [200,obj]
        } catch (error) {
            console.log(error)
            throw error.message
        }
    }
    getCurrencyRate = async (amount,symbol) => {
        try {

            
    //   console.log(amount,symbol,"amount1")
           
            let url = `https://currency13.p.rapidapi.com/convert/${amount}/CAD/${symbol}`
            let header = {
                "x-rapidapi-host": "currency13.p.rapidapi.com",
                "x-rapidapi-key": "key here"
            }
            let result = await axios.get(url, {params: {}, headers: header})
            console.log(result.data, 'amount3')
            
            return [200,result.data.amount]
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}