import { IsNotEmpty, IsNumber, IsString, IsInt, IsDateString, IsPositive } from 'class-validator';

/** DTO de validation pour la création de transaction entre deux comptes */
export class CreateTransactionDto {
  /** Montant de la transaction (doit être positif) */
  @IsNotEmpty({ message: 'Le montant est obligatoire' })
  @IsNumber({}, { message: 'Le montant doit être un nombre' })
  @IsPositive({ message: 'Le montant doit être positif' })
  amount: number;

  /** Statut (ex: completed, pending, failed) */
  @IsNotEmpty({ message: 'Le statut est obligatoire' })
  @IsString({ message: 'Le statut doit être une chaîne de caractères' })
  status: string;

  /** Date au format ISO 8601 */
  @IsNotEmpty({ message: 'La date est obligatoire' })
  @IsDateString({}, { message: 'La date doit être au format ISO 8601' })
  date: string;

  /** ID de l'expéditeur (doit exister) */
  @IsNotEmpty({ message: "L'ID de l'expéditeur est obligatoire" })
  @IsInt({ message: "L'ID de l'expéditeur doit être un entier" })
  senderId: number;

  /** ID du destinataire (doit exister) */
  @IsNotEmpty({ message: "L'ID du destinataire est obligatoire" })
  @IsInt({ message: "L'ID du destinataire doit être un entier" })
  receiverId: number;
}
