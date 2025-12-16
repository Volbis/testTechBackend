import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

/** Service gérant la logique métier des transactions */
@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  /** Crée une transaction (userId doit exister) */
  async create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        amount: createTransactionDto.amount,
        status: createTransactionDto.status,
        date: new Date(createTransactionDto.date),
        userId: createTransactionDto.userId,
      },
      include: {
        user: true,
      },
    });
  }

  /** Récupère toutes les transactions triées par date (desc) */
  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        user: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  /** Récupère les transactions d'un utilisateur triées par date (desc) */
  async findByUser(userId: number) {
    return this.prisma.transaction.findMany({
      where: { userId },
      include: {
        user: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}
