// Charger les variables d'environnement
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/** Point d'entrée de l'application */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Validation automatique des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Active CORS pour les requêtes cross-origin
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application démarrée sur le port ${process.env.PORT ?? 3000}`);
}
bootstrap();
