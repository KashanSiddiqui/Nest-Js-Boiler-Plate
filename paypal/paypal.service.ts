import { Injectable, NotFoundException } from '@nestjs/common';
const paypal = require('paypal-rest-sdk');
const {promisify} = require('util');
exports.create = promisify(paypal.payment.create);
exports.execute = promisify(paypal.payment.execute)

// const Constant= require('../constants')
// import {InjectModel} from '@nestjs/mongoose'
// import {Model} from 'mongoose'
// import { Product } from './product.model'
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': "",
    'client_secret':"" 
});

@Injectable()
export class PaypalService {
    // products: Product[] = [];

    constructor(){}

    getListOfCurrencies = async () => {
        try {
            const CURRENCY_LIST = [
                {
                    symbol:"AUD",
                    decimal:"2"
                },
                {
                    symbol: "BRL",
                    decimal: "2"
                },
                {
                    symbol:"CAD",
                    decimal:"2"
                },
                {
                    symbol: "CZK",
                    decimal: "2"
                },
                {
                    symbol:"DKK",
                    decimal:"2"
                },
                {
                    symbol: "EUR",
                    decimal: "2"
                },
                {
                    symbol:"HKD",
                    decimal:"2"
                },
                {
                    symbol: "HUF",
                    decimal: "0"
                },
                {
                    symbol: "ILS",
                    decimal: "2"
                },
                {
                    symbol:"JPY",
                    decimal:"0"
                },
                {
                    symbol: "MYR",
                    decimal: "2"
                },
                {
                    symbol:"MXN",
                    decimal:"2"
                },
                {
                    symbol: "TWD",
                    decimal: "0"
                },
                {
                    symbol:"NZD",
                    decimal:"2"
                },
                {
                    symbol: "NOK",
                    decimal: "2"
                },
                {
                    symbol:"PHP",
                    decimal:"2"
                },
                {
                    symbol: "PLN",
                    decimal: "2"
                },
                {
                    symbol:"GBP",
                    decimal:"2"
                },
                {
                    symbol: "RUB",
                    decimal: "2"
                },
                {
                    symbol:"SGD",
                    decimal:"2"
                },
                {
                    symbol: "SEK",
                    decimal: "2"
                },
                {
                    symbol:"CHF",
                    decimal:"2"
                },
                {
                    symbol: "THB",
                    decimal: "2"
                },
                {
                    symbol:"USD",
                    decimal:"2"
                }
            ]
            return [200,CURRENCY_LIST]
        } catch (e) {
            console.log(e)
            return false
        }
    }
    

    createPayment = async (obj) => {
        try {
            console.log(obj,"secondd")
            let create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://localhost:3000",
                    "cancel_url": "http://cancel.url"
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": "item",
                            "sku": "item",
                            "price": obj.amount,
                            "currency": obj.currency.toUpperCase(),
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "currency": obj.currency.toUpperCase(),
                        "total": obj.amount
                    },
                    "description": "your description here"
                }]
            };
            return new Promise(async function (resolve, reject) {
                paypal.payment.create(create_payment_json, async function (error, payment) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(payment);
                    }
                })
            });
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    }


    executePayment= async (obj) =>{
        try{
            const execute_payment_obj={
                "payer_id":obj.payerID,
                "transactions":[{
                    "amount":{
                        "currency":obj.currency.toUpperCase(),
                        "total":obj.amount
                    }
                }]
            }
            return new Promise(async function (resolve, reject) {
                paypal.payment.execute(obj.paymentId,execute_payment_obj, async function (error, payment) {
                    if (error) {
                        reject(error);
                    } else {
                        console.log(payment,"payyyyyyyy")
                        resolve(payment);
                    }
                })
            });
        }catch (e) {
            console.log(e)
            return false
        }
    }
    
// const obj = {
//        amount: "100", //this means 1 dollar
//        currency: "USD",
//        source: "tok_visa"
//      }

}