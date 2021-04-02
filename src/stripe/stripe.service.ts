import { Injectable, NotFoundException } from '@nestjs/common';
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_KEY); //will be replaced by my key afterward
const axios = require('axios');
const paypal = require('paypal-rest-sdk');
const {promisify} = require('util');

@Injectable()
export class StripeService {

    constructor(){}

    //get stripe supported currencies
    getListOfCurrencies = async () => {
        try {
            let url = "https://currency13.p.rapidapi.com/list"
            let header = {
                "x-rapidapi-host": process.env.RAPID_API_HOST,
                "x-rapidapi-key": process.env.RAPID_API_KEY
            }
            const currencies = []
            let result = await axios.get(url, {params: {}, headers: header})
            for (let i = 0; i < result.data.currencies.length; i++) {
                currencies.push(result.data.currencies[i].code)
            }
            const currenciesStripe = await this.getCountrySpecList()
            let totalCurrency = []
            for (let i = 0; i < currencies.length; i++) {
                if (currenciesStripe.indexOf(currencies[i].toLowerCase()) !== -1 && totalCurrency.indexOf(currencies[i].toLowerCase()) === -1) {
                    totalCurrency.push(currencies[i].toLowerCase())
                }
            }
            let supportedCurrencies = []
            let ZERO_DECIMAL_CURRENCY = [
                'bif', 'clp', 'gnf', 'jpy', 'kmf', 'krw', 'xpf', 'xof', 'xaf', 'vuv', 'vnd', 'ugx', 'rwf', 'pyg', 'mgf'
            ]
            for (let i = 0; i < totalCurrency.length; i++) {
                if (ZERO_DECIMAL_CURRENCY.indexOf(totalCurrency[i]) !== -1) {
                    console.log(totalCurrency[i])
                    supportedCurrencies.push({
                        decimal: 0,
                        currency: totalCurrency[i].toLowerCase()
                    })
                } else {
                    supportedCurrencies.push({
                        decimal: 2,
                        currency: totalCurrency[i].toLowerCase()
                    })
                }
            }
            return [200,supportedCurrencies]
        } catch (e) {
            console.log(e)
            return false
        }
    }
    
    getCountrySpecList = async () => {
        try {
            let result = await stripe.countrySpecs.list();
            let currency = []
            for (let i = 0; i < result.data.length; i++) {
                if (result.data[i].default_currency === 'cad') {
                    currency = [...result.data[i].supported_payment_currencies]
                }
            }
            return currency
        } catch (e) {
            console.log(e)
            return "false"
        }
    }
    
    //execute payment in stripe
createPayment = async (obj) => {
    console.log(obj,"objjjjjjjjj")
    try {
        if(obj.currency.decimal==2){
            obj.amount=obj.amount*100
        }
        console.log(obj,"ooooooooo")
        let charge = await stripe.charges.create({
            amount: obj.amount,
            currency: obj.currency.currency,
            source: obj.source,
            // description: obj.description
        })
        console.log(charge.id,"iddd") //payment ID
        return [200,charge]
    } catch (error) {
        // console.log(e)
        throw [404, "Payment Failed",error.message];
    }
}

}
