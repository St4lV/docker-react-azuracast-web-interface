# Utiliser l'image de base pour Node.js
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /tirnatek-radio/

# Copier les fichiers nécessaires dans le conteneur
COPY . /tirnatek-radio/

# Installer les dépendances et construire l'application React
RUN npm install
RUN npm run build

# Installer serve pour servir les fichiers statiques
RUN npm install -g serve

# Définir la variable d'environnement pour le port
ENV PORT=3000

# Commande pour exécuter l'application React construite avec serve
CMD ["serve", "-s", "build"]