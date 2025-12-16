import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

/** DTO de validation pour la création d'utilisateur */
export class CreateUserDto {
  /** Nom complet */
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name: string;

  /** Email (unique) */
  @IsNotEmpty({ message: "L'email est obligatoire" })
  @IsEmail({}, { message: "L'email doit être valide" })
  email: string;

  /** Numéro de téléphone */
  @IsNotEmpty({ message: 'Le téléphone est obligatoire' })
  @IsString({ message: 'Le téléphone doit être une chaîne de caractères' })
  phone: string;

  /** Solde initial du compte */
  @IsNotEmpty({ message: 'Le solde initial est obligatoire' })
  @IsNumber({}, { message: 'Le solde doit être un nombre' })
  @IsPositive({ message: 'Le solde doit être positif' })
  balance: number;
}
