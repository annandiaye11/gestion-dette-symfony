# frontend/Dockerfile
FROM node:16

# Créer le dossier de travail
WORKDIR /app

# Copier les fichiers de configuration (package.json et package-lock.json)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port 3000 pour Vite
EXPOSE 5173

# Commande pour démarrer Vite
CMD ["npm", "run", "dev", "--", "--host"]
