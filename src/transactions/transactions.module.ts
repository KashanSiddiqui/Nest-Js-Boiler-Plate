import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
    imports: [],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionsModule {}
