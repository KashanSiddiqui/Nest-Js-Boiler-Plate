import { Injectable } from '@nestjs/common';
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class TransactionsService {

    getEthTransactionHistory = async (address) => {
        try{
            const API_KEY = process.env.ETHERSCAN_API_KEY;
            const txUrl = `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=999999999&sort=desc&apikey=${API_KEY}`;
            const txRes = await axios.get(txUrl);
            const ethTx = txRes.data.result;
            return ethTx
        }
        catch(e){
            throw e.message
        }
    }

    getErc20TransactionHistory = async (address) => {
        try{
            const API_KEY = process.env.ETHERSCAN_API_KEY;
            const tokenUrl = `http://api-rinkeby.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=desc&apikey=${API_KEY}`;
            const tokenRes = await axios.get(tokenUrl);
            const tokenTx = tokenRes.data.result;
            return tokenTx
        }
        catch(e){
            throw e.message
        }
    }

}
