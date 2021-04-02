import { Controller, Post, Body, Param, Get, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { TransactionsService } from "./transactions.service";

@Controller('transactions')
@UseGuards(new JWTAuthGuard())
export class TransactionsController {
    constructor(private readonly TransactionService: TransactionsService) {}

    @Get('eth/:address')
    async getEthTransactions(@Param('address') address:string) {
        const tnx = await this.TransactionService.getEthTransactionHistory(address)
        return tnx
    }

    @Get('erc20/:address')
    async getErc20Transactions(@Param('address') address:string) {
        const tnx = await this.TransactionService.getErc20TransactionHistory(address)
        return tnx
    }
}
