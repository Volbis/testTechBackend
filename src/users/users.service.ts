import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

/** Service gérant la logique métier des utilisateurs */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /** Crée un utilisateur (email unique requis) */
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  /** Récupère tous les utilisateurs avec leurs transactions */
  async findAll() {
    return this.prisma.user.findMany({
      include: {
        sentTransactions: {
          include: {
            receiver: { select: { id: true, name: true, email: true } },
          },
        },
        receivedTransactions: {
          include: {
            sender: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });
  }

  /** Récupère un utilisateur par ID avec ses transactions */
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        sentTransactions: {
          include: {
            receiver: { select: { id: true, name: true, email: true } },
          },
        },
        receivedTransactions: {
          include: {
            sender: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });
  }
}
