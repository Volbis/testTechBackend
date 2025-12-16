import { Controller, Get, Post, Body, Query, ParseIntPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

/** Contrôleur pour la gestion des transactions */
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  /** Crée une transaction (POST /transactions) */
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  /** Récupère toutes les transactions ou filtre par userId (GET /transactions?userId=1) */
  @Get()
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.transactionsService.findByUser(parseInt(userId, 10));
    }
    return this.transactionsService.findAll();
  }
}
