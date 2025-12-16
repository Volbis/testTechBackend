<div align="center">

# Mini API REST

### Gestion d'Utilisateurs et Transactions

<img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />

[![NestJS](https://img.shields.io/badge/NestJS-11.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.1-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

*API REST moderne et scalable développée avec les meilleures pratiques*

[Installation](#installation) • [Documentation](#documentation-de-lapi) • [Exemples](#exemples-dutilisation)

</div>

---

## Vue d'Ensemble

> **Contexte :** API développée dans le cadre d'un test technique

Cette API REST permet de gérer un système d'utilisateurs et leurs transactions associées avec validation automatique des données et gestion complète des erreurs.

### Fonctionnalités

- **Gestion des utilisateurs** : Création et consultation avec validation d'email unique
- **Gestion des transactions** : Création et consultation avec relations utilisateur
- **Validation automatique** : Contrôle des données avec class-validator
- **Gestion des erreurs** : Réponses HTTP standardisées
- **Relations** : Liaison automatique entre utilisateurs et transactions
- **Filtrage avancé** : Consultation par utilisateur

---

## Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| **NestJS** | 11.0 | Framework backend |
| **TypeScript** | 5.7 | Langage principal |
| **PostgreSQL** | 12+ | Base de données |
| **Prisma** | 7.1 | ORM & migrations |
| **class-validator** | 0.14 | Validation des DTOs |

---

## Architecture du Projet

```
mini-api/
├── src/
│   ├── users/                # Module utilisateurs
│   │   ├── dto/             # Validation des données
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── transactions/        # Module transactions
│   │   ├── dto/
│   │   ├── transactions.controller.ts
│   │   ├── transactions.service.ts
│   │   └── transactions.module.ts
│   ├── prisma/              # Configuration BDD
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   └── main.ts              # Point d'entrée
├── prisma/
│   ├── schema.prisma        # Schéma de la base
│   └── migrations/          # Historique des migrations
└── .env                     # Variables d'environnement
```

---

## Installation

### Prérequis

```bash
Node.js  ≥ v18
PostgreSQL ≥ v12
npm ou yarn
```

### Étapes d'Installation

#### 1. Cloner et installer

```bash
git clone <url-du-repo>
cd mini-api
npm install
```

#### 2. Configuration de l'environnement

Créer un fichier `.env` :

```env
DATABASE_URL="postgresql://mini_user:password@localhost:5432/mini_api"
PORT=3000
```

#### 3. Configuration de PostgreSQL

```bash
# Connexion à PostgreSQL
sudo -u postgres psql

# Création de la base et de l'utilisateur
CREATE DATABASE mini_api;
CREATE USER mini_user WITH PASSWORD 'password';
ALTER USER mini_user CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE mini_api TO mini_user;
ALTER DATABASE mini_api OWNER TO mini_user;
\q
```

#### 4. Initialisation de Prisma

```bash
# Exécuter les migrations
npx prisma migrate dev --name init

# Générer le client Prisma
npx prisma generate
```

#### 5. Lancer l'application

```bash
npm run start:dev
```

> **L'API est maintenant accessible sur** `http://localhost:3000`

---

## Documentation de l'API

### Endpoints Disponibles

<table>
<thead>
<tr>
<th>Méthode</th>
<th>Endpoint</th>
<th>Description</th>
<th>Body</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>POST</code></td>
<td><code>/users</code></td>
<td>Créer un utilisateur</td>
<td>Requis</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/users</code></td>
<td>Liste tous les utilisateurs</td>
<td>-</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/users/:id</code></td>
<td>Récupérer un utilisateur</td>
<td>-</td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/transactions</code></td>
<td>Créer une transaction</td>
<td>Requis</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/transactions</code></td>
<td>Liste toutes les transactions</td>
<td>-</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/transactions?userId=1</code></td>
<td>Transactions d'un utilisateur</td>
<td>-</td>
</tr>
</tbody>
</table>

### Exemples d'Utilisation

<details>
<summary><b>Créer un utilisateur</b></summary>

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "phone": "+33612345678"
  }'
```

**Réponse (201) :**
```json
{
  "id": 1,
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "phone": "+33612345678"
}
```
</details>

<details>
<summary><b>Créer une transaction</b></summary>

```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 150.50,
    "status": "completed",
    "date": "2025-12-16T17:45:00Z",
    "userId": 1
  }'
```

**Réponse (201) :**
```json
{
  "id": 1,
  "amount": 150.50,
  "status": "completed",
  "date": "2025-12-16T17:45:00.000Z",
  "userId": 1,
  "user": { "name": "Jean Dupont", ... }
}
```
</details>

<details>
<summary><b>Récupérer les transactions</b></summary>

```bash
# Toutes les transactions (triées par date DESC)
curl http://localhost:3000/transactions

# Transactions d'un utilisateur spécifique
curl http://localhost:3000/transactions?userId=1
```
</details>

---

## Validation des Données

L'API implémente une validation stricte via **class-validator** :

| Champ | Règles | Exemple |
|-------|--------|---------|
| **Email** | Valide + Unique | `user@example.com` |
| **Téléphone** | Requis, String | `+33612345678` |
| **Montant** | Nombre décimal | `150.50` |
| **Date** | ISO 8601 | `2025-12-16T17:45:00Z` |
| **UserId** | Entier existant | `1` |

### Codes de Réponse HTTP

| Code | Signification | Exemple |
|------|---------------|---------|
| `200` | Succès | Récupération réussie |
| `201` | Créé | Ressource créée |
| `400` | Mauvaise requête | Validation échouée |
| `404` | Non trouvé | Utilisateur inexistant |
| `500` | Erreur serveur | Erreur interne |

**Exemple d'erreur de validation :**
```json
{
  "message": ["L'email doit être valide"],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## Outils de Développement

### Prisma Studio
Interface graphique pour gérer les données :
```bash
npx prisma studio
```
> Accessible sur `http://localhost:5555`

### Export de la base de données
```bash
pg_dump -U mini_user -h localhost mini_api > backup_$(date +%Y%m%d).sql
```

---

## Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run start:dev` | Mode développement (hot-reload) |
| `npm run start:prod` | Mode production |
| `npm run build` | Compilation TypeScript |
| `npm run lint` | Analyse du code (ESLint) |
| `npm run format` | Formatage du code (Prettier) |
| `npm test` | Tests unitaires |
| `npm run test:e2e` | Tests end-to-end |

---

<div align="center">

## Auteur

**Albert Coulibaly**

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://volbis-s-portefolio.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/votre-profil)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/votre-profil)

---

### Licence

Ce projet est sous licence **MIT**

---

*Développé avec ❤️ en utilisant NestJS et TypeScript*

</div>

