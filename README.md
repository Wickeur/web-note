# Groupe : LEULIET Quentin & WICKE Julian

# Projet : Gestionnaire de Notes

Bienvenue dans le projet Gestionnaire de Notes ! Ce document fournit une vue d'ensemble des fonctionnalités développées ainsi que des instructions pour installer et utiliser le projet.

## Fonctionnalités

### 1. Ajouter une Note

Cette fonctionnalité permet à l'utilisateur d'ajouter de nouvelles notes. Vous pouvez créer une note en spécifiant un titre et un contenu. Les notes sont sauvegardées dans la base de données et peuvent être consultées ultérieurement.

### 2. Modifier une Note

L'utilisateur peut modifier une note existante. En sélectionnant une note, vous pouvez éditer son titre et son contenu, puis enregistrer les modifications. Cela permet de maintenir les notes à jour et de corriger ou enrichir les informations au besoin.

### 3. Système de Gestion des Utilisateurs

Le projet inclut un système de gestion des utilisateurs. Les fonctionnalités de gestion incluent :

- Inscription : Les nouveaux utilisateurs peuvent créer un compte.
- Connexion : Les utilisateurs peuvent se connecter à leur compte existant.
- Déconnexion : Les utilisateurs peuvent se déconnecter de leur session.
- Gestion de profil : Les utilisateurs peuvent mettre à jour leurs informations de profil.

### 4. Mise en Place d'une Progressive Web App (PWA)

Le projet a été transformé en une Progressive Web App (PWA). Cela signifie que l'application est installable sur les appareils mobiles et de bureau. Les utilisateurs peuvent ajouter l'application à leur écran d'accueil pour une expérience utilisateur plus native.

### 5. Mise en Cache de la Page des Notes en Mode Hors Ligne

Pour améliorer l'expérience utilisateur, surtout en cas de connexion internet instable, la page des notes est mise en cache. Cela permet aux utilisateurs de consulter leurs notes même lorsqu'ils sont hors ligne. Les modifications seront synchronisées avec le serveur une fois la connexion rétablie.

### 6. Affichage Conditionnel des Fonctionnalités en Mode Hors Ligne

Certaines fonctionnalités sont inaccessibles en mode hors ligne. Pour améliorer la clarté et l'expérience utilisateur, les pages et options non disponibles en mode hors ligne sont automatiquement masquées. Cela permet d'éviter les erreurs et d'optimiser l'utilisation de l'application dans toutes les conditions.

## Installation

### Prérequis

- PHP 7.4 ou supérieur
- Composer
- Symfony CLI
- Serveur MySQL ou PostgreSQL
- Node.js et npm (pour la gestion des assets)

### Étapes d'Installation

1. **Cloner le projet**

```bash
   git clone https://your-repository-url.git
   cd your-project-directory
```

2. **Installer les dépendances**

```bash
    composer install
    npm install
    npm run build
    yarn install
    yarn dev
```

3. **Configurer l'environnement**

```plaintext
    modifier ".env" : DATABASE_URL="mysql://root:@127.0.0.1:3306/db_name"
        - Modifier si besoin l'utilisateur
        - Modifier si besoin son mot de passe
        - Modifier le nom de la base de donnée
```

4. **Créer la base de données**

```bash
symfony console doctrine:database:create
php bin/console make:entity
php bin/console make:migration
php bin/console d:m:m
```

5. **Démarrer le serveur de développement**

```bash
symfony server:start
```

Accédez à l'application à l'adresse http://localhost:8000
