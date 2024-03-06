# Projet de messagerie instantanée 

Ce projet implémente un système de chat IRC (Internet Relay Chat) utilisant NodeJS et ExpressJS pour le serveur, et ReactJS pour le client.

## Fonctionnalités
- **authentification:** Chaque utilisateur doit s'inscrire et s'authentfier avec mail et mot de passe.
- **Connexions multiples :** Le serveur accepte plusieurs connexions simultanées.
- **Gestion des canaux :** Possibilité de rejoindre, créer, renommer et supprimer des canaux.
- **Messagerie :** Les utilisateurs peuvent envoyer des messages dans les canaux dont ils sont membres.
- **Persistence :** Les canaux et les messages sont sauvegardés de manière persistante.
- **Username :** Chaque utilisateur doit choisir un username avant d'utiliser l'application.

## Technologies Utilisées

- Backend : NodeJS + ExpressJS
- Frontend : ReactJS
- Communication : Socket.IO pour la communication en temps réel.
- Persistence : Base de données MongoDB 


## Démarrage du projet

   Pour le serveur :
   cd server
   npm install
   npm start
   
    Pour le client :
   cd server
   npm install
   npm run dev
