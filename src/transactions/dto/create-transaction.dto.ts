import { IsNotEmpty, IsNumber, IsString, IsInt, IsDateString } from 'class-validator';

/** DTO de validation pour la création de transaction */
export class CreateTransactionDto {
  /** Montant de la transaction */
  @IsNotEmpty({ message: 'Le montant est obligatoire' })
  @IsNumber({}, { message: 'Le montant doit être un nombre' })
  amount: number;

  /** Statut (ex: completed, pending, failed) */
  @IsNotEmpty({ message: 'Le statut est obligatoire' })
  @IsString({ message: 'Le statut doit être une chaîne de caractères' })
  status: string;

  /** Date au format ISO 8601 */
  @IsNotEmpty({ message: 'La date est obligatoire' })
  @IsDateString({}, { message: 'La date doit être au format ISO 8601' })
  date: string;

  /** ID de l'utilisateur (doit exister) */
  @IsNotEmpty({ message: "L'ID utilisateur est obligatoire" })
  @IsInt({ message: "L'ID utilisateur doit être un entier" })
  userId: number;
}
