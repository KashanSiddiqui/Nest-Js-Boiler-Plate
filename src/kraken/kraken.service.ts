import { Injectable, NotFoundException } from '@nestjs/common';
const axios = require('axios');
const KrakenClient = require('kraken-api');
const dotenv = require('dotenv');
dotenv.config();
const kraken = new KrakenClient(process.env.KRAKEN_KEY, process.env.KRAKEN_SECRET);

@Injectable()
export class KrakenService {
    // products: Product[] = [];

    constructor(){}

//Function that return  amount of 1btc in the given currency symbol
    getTickerInformation = async (symbol) => {
        try {
            let info = await kraken.api('Ticker', {pair: 'XXBTZUSD'}) //get usd base price
            // console.log(info.result['XXBTZUSD'].a[0], 'ask price')
            let url = `https://currency13.p.rapidapi.com/convert/${info.result['XXBTZUSD'].a[0]}/USD/${symbol}`
            let header = {
                "x-rapidapi-host": process.env.RAPID_API_HOST,
                "x-rapidapi-key": process.env.RAPID_API_KEY
            }
            let result = await axios.get(url, {params: {}, headers: header}) //convert usd amount of 1btc to other currency
            const fiat= await this.getCurrencyRateOfAll(1,symbol)
            const obj={cryptoAmount:result.data.amount,fiatAmount:fiat[1]}
            return [200,obj]
        } catch (error) {
            console.log(error)
            throw error.message
        }
    }

    //Function to convert canadian amount and currency into given currency and amount
    getCurrencyRate = async (amount,symbol) => {
        try {
            let url = `https://currency13.p.rapidapi.com/convert/${amount}/CAD/${symbol}`
            let header = {
                "x-rapidapi-host": process.env.RAPID_API_HOST,
                "x-rapidapi-key": process.env.RAPID_API_KEY
            }
            let result = await axios.get(url, {params: {}, headers: header})
            console.log(result.data, 'amount3')
            
            return [200,result.data.amount]
        } catch (error) {
            console.log(error)
            throw error
        }
    }




    //Function to convert given amount and currency into canadian currency and amount
    getCurrencyRateOfAll = async (amount,symbol) => {
        try {
            let url = `https://currency13.p.rapidapi.com/convert/${amount}/${symbol}/CAD`
            let header = {
                "x-rapidapi-host": process.env.RAPID_API_HOST,
                "x-rapidapi-key": process.env.RAPID_API_KEY
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
