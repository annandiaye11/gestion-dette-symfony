#!/bin/bash

# Mise à jour de la liste des paquets
echo "Mise à jour de la liste des paquets..."
sudo apt update

# Installation de PostgreSQL
echo "Installation de PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Démarrage et activation du service PostgreSQL
echo "Démarrage et activation du service PostgreSQL..."
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Installation de l'extension PHP pour PostgreSQL
echo "Installation de l'extension PHP pour PostgreSQL..."
sudo apt install -y php-pgsql

# Création d'un utilisateur PostgreSQL et d'une base de données
read -p "Entrez le nom de l'utilisateur PostgreSQL à créer : " pg_user
read -s -p "Entrez le mot de passe pour l'utilisateur $pg_user : " pg_password
echo
read -p "Entrez le nom de la base de données à créer : " db_name

# Exécution des commandes PostgreSQL pour créer un utilisateur et une base de données
sudo -u postgres psql -c "CREATE USER $pg_user WITH PASSWORD '$pg_password';"
sudo -u postgres psql -c "CREATE DATABASE $db_name OWNER $pg_user;"

# Affichage des informations de connexion
echo "Installation terminée."
echo "Utilisateur PostgreSQL : $pg_user"
echo "Base de données : $db_name"

# Redémarrage du service PostgreSQL pour appliquer les modifications
sudo systemctl restart postgresql

echo "PostgreSQL est installé et configuré avec succès."
