import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

/** Service Prisma gérant la connexion à PostgreSQL */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    
    super({
      adapter,
      log: ['error', 'warn'],
    });
  }

  /** Connexion à la DB au démarrage */
  async onModuleInit() {
    await this.$connect();
  }

  /** Déconnexion à l'arrêt */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
