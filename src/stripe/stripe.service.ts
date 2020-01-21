import { Injectable, NotFoundException } from '@nestjs/common';
const stripe = require('stripe')('sk_test_9aHwbXgFNsmoySu5N23MHyi0000ldZDUKZ'); //will be replaced by my key afterward
// const Constant= require('../constants')
// import {InjectModel} from '@nestjs/mongoose'
// import {Model} from 'mongoose'
// import { Product } from './product.model'
@Injectable()
export class StripeService {
    // products: Product[] = [];

    constructor(){}
createPayment = async (obj) => {
    // console.log(obj,"objjjjjjjjj")
    try {

        let charge = await stripe.charges.create({
            amount: obj.amount,
            currency: obj.currency,
            source: obj.source,
            // description: obj.description
        })
        console.log(charge.id,"iddd") //payment ID
        return charge
    } catch (error) {
        // console.log(e)
        throw [404, "Payment Failed",error.message];
    }
}
// const obj = {
//        amount: "100", //this means 1 dollar
//        currency: "USD",
//        source: "tok_visa"
//      }

}