import { Injectable, NotFoundException } from '@nestjs/common';
const paypal = require('paypal-rest-sdk');
const {promisify} = require('util');
exports.create = promisify(paypal.payment.create);
exports.execute = promisify(paypal.payment.execute)

//paypal configuration
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': '',
    'client_secret': ''
});

@Injectable()
export class PaypalService {
    constructor(){}

    //function that returns paypal supported currencies
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
    
    // http://104.238.152.209:4002
    //function that create payment and return token to front end
    createPayment = async (obj) => {
        try {
            let create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://104.238.152.209:4002",
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
                    "description": "All orders contain a 10CAD wallet material charge and 1.30CAD harmonised sales tax, included in your Payment Amount."
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


    //function that execute payment from token that it receive from front end
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
