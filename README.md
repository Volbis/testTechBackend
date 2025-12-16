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

Cette API REST permet de gérer un système de transfert d'argent entre utilisateurs avec validation automatique des soldes et gestion complète des transactions.

### Fonctionnalités

- **Gestion des utilisateurs** : Création, consultation avec validation d'email unique et suivi des soldes
- **Système de transfert** : Transfert d'argent entre deux comptes avec débit/crédit automatique
- **Validation des soldes** : Vérification automatique de la disponibilité des fonds
- **Transactions atomiques** : Garantie d'intégrité des opérations (débit + crédit simultanés)
- **Validation automatique** : Contrôle des données avec class-validator
- **Gestion des erreurs** : Réponses HTTP standardisées avec messages explicites
- **Filtrage avancé** : Consultation des transferts par utilisateur (envoyés et reçus)

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
<td>Effectuer un transfert</td>
<td>Requis</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/transactions</code></td>
<td>Liste tous les transferts</td>
<td>-</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/transactions?userId=1</code></td>
<td>Transferts d'un utilisateur (envoyés + reçus)</td>
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
    "name": "Alice Martin",
    "email": "alice.martin@example.com",
    "phone": "+2250701234567",
    "balance": 1000
  }'
```

**Réponse (201) :**
```json
{
  "id": 1,
  "name": "Alice Martin",
  "email": "alice.martin@example.com",
  "phone": "+2250701234567",
  "balance": 1000
}
```
</details>

<details>
<summary><b>Effectuer un transfert</b></summary>

```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 150.50,
    "status": "completed",
    "date": "2025-12-16T20:30:00Z",
    "senderId": 1,
    "receiverId": 2
  }'
```

**Réponse (201) - Transfert réussi :**
```json
{
  "id": 1,
  "amount": 150.50,
  "status": "completed",
  "date": "2025-12-16T20:30:00.000Z",
  "senderId": 1,
  "receiverId": 2,
  "sender": {
    "id": 1,
    "name": "Alice Martin",
    "email": "alice.martin@example.com",
    "balance": 849.50
  },
  "receiver": {
    "id": 2,
    "name": "Bob Traoré",
    "email": "bob.traore@example.com",
    "balance": 650.50
  }
}
```

**Réponse (400) - Solde insuffisant :**
```json
{
  "message": "Solde insuffisant. Solde disponible: 50, Montant demandé: 150.50",
  "error": "Bad Request",
  "statusCode": 400
}
```

**Réponse (400) - Envoyeur = Récepteur :**
```json
{
  "message": "L'envoyeur et le récepteur doivent être différents",
  "error": "Bad Request",
  "statusCode": 400
}
```
</details>

<details>
<summary><b>Récupérer les transferts</b></summary>

```bash
# Tous les transferts (triés par date DESC)
curl http://localhost:3000/transactions

# Transferts d'un utilisateur (envoyés + reçus)
curl http://localhost:3000/transactions?userId=1
```

**Réponse :**
```json
[
  {
    "id": 1,
    "amount": 150.50,
    "status": "completed",
    "date": "2025-12-16T20:30:00.000Z",
    "senderId": 1,
    "receiverId": 2,
    "sender": {
      "id": 1,
      "name": "Alice Martin",
      "email": "alice.martin@example.com"
    },
    "receiver": {
      "id": 2,
      "name": "Bob Traoré",
      "email": "bob.traore@example.com"
    }
  }
]
```
</details>

<details>
<summary><b>Consulter un utilisateur avec son solde</b></summary>

```bash
curl http://localhost:3000/users/1
```

**Réponse :**
```json
{
  "id": 1,
  "name": "Alice Martin",
  "email": "alice.martin@example.com",
  "phone": "+2250701234567",
  "balance": 849.50,
  "sentTransactions": [...],
  "receivedTransactions": [...]
}
```
</details>

---

## Validation des Données

L'API implémente une validation stricte via **class-validator** :

### Création d'Utilisateur

| Champ | Règles | Exemple |
|-------|--------|---------|
| **Name** | Requis, String | `Alice Martin` |
| **Email** | Valide + Unique | `user@example.com` |
| **Téléphone** | Requis, String | `+2250701234567` |
| **Balance** | Nombre positif, Requis | `1000` |

### Création de Transfert

| Champ | Règles | Exemple |
|-------|--------|---------|
| **Montant** | Nombre positif | `150.50` |
| **Date** | ISO 8601 | `2025-12-16T20:30:00Z` |
| **SenderId** | Entier existant | `1` |
| **ReceiverId** | Entier existant, ≠ senderId | `2` |

### Règles de Transfert

- L'envoyeur et le récepteur doivent être différents
- Le solde de l'envoyeur doit être suffisant
- Les deux utilisateurs doivent exister dans la base
- Le transfert est atomique (débit + crédit simultanés)

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
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/albert-coulibaly-2789a5324/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Volbis)

---

### Licence

Ce projet est sous licence **MIT**

---

*Développé avec le ❤️*

</div>

