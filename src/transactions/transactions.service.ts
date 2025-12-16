import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

/** Service gérant la logique métier des transactions entre comptes */
@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  /** Crée une transaction et effectue le transfert entre deux comptes */
  async create(createTransactionDto: CreateTransactionDto) {
    const { amount, senderId, receiverId } = createTransactionDto;

    // Vérifier que l'expéditeur et le destinataire sont différents
    if (senderId === receiverId) {
      throw new BadRequestException('L\'expéditeur et le destinataire doivent être différents');
    }

    // Vérifier l'existence des deux utilisateurs
    const [sender, receiver] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: senderId } }),
      this.prisma.user.findUnique({ where: { id: receiverId } }),
    ]);

    if (!sender) {
      throw new NotFoundException(`Expéditeur avec l'ID ${senderId} introuvable`);
    }

    if (!receiver) {
      throw new NotFoundException(`Destinataire avec l'ID ${receiverId} introuvable`);
    }

    // Vérifier que l'expéditeur a suffisamment de fonds
    if (sender.balance < amount) {
      throw new BadRequestException(
        `Solde insuffisant. Solde disponible: ${sender.balance}, Montant demandé: ${amount}`,
      );
    }

    // Exécuter la transaction avec mise à jour des soldes (transaction atomique)
    return await this.prisma.$transaction(async (tx) => {
      // Débiter l'expéditeur
      await tx.user.update({
        where: { id: senderId },
        data: { balance: { decrement: amount } },
      });

      // Créditer le destinataire
      await tx.user.update({
        where: { id: receiverId },
        data: { balance: { increment: amount } },
      });

      // Créer la transaction
      return tx.transaction.create({
        data: {
          amount,
          status: createTransactionDto.status,
          date: new Date(createTransactionDto.date),
          senderId,
          receiverId,
        },
        include: {
          sender: { select: { id: true, name: true, email: true, balance: true } },
          receiver: { select: { id: true, name: true, email: true, balance: true } },
        },
      });
    });
  }

  /** Récupère toutes les transactions triées par date (desc) */
  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        sender: { select: { id: true, name: true, email: true } },
        receiver: { select: { id: true, name: true, email: true } },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  /** Récupère les transactions d'un utilisateur (envoyées et reçues) */
  async findByUser(userId: number) {
    return this.prisma.transaction.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      include: {
        sender: { select: { id: true, name: true, email: true } },
        receiver: { select: { id: true, name: true, email: true } },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}
