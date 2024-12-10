<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241101155514 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
{
    // Créer la séquence pour la colonne id
    $this->addSql('CREATE SEQUENCE client_id_seq INCREMENT BY 1 MINVALUE 1 START 1');

    // Créer la table client avec la séquence pour l'ID
    $this->addSql('CREATE TABLE client (
        id INT NOT NULL DEFAULT nextval(\'client_id_seq\'),
        telephone VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        adresse VARCHAR(255) NOT NULL,
        PRIMARY KEY(id)
    )');

    // Créer la table messenger_messages
    $this->addSql('CREATE TABLE messenger_messages (
        id BIGSERIAL NOT NULL,
        body TEXT NOT NULL,
        headers TEXT NOT NULL,
        queue_name VARCHAR(190) NOT NULL,
        created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
        available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
        delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL,
        PRIMARY KEY(id)
    )');

    // Ajouter les index et les triggers
    $this->addSql('CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)');
    $this->addSql('CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)');
    $this->addSql('CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)');
    $this->addSql('COMMENT ON COLUMN messenger_messages.created_at IS \'(DC2Type:datetime_immutable)\'');
    $this->addSql('COMMENT ON COLUMN messenger_messages.available_at IS \'(DC2Type:datetime_immutable)\'');
    $this->addSql('COMMENT ON COLUMN messenger_messages.delivered_at IS \'(DC2Type:datetime_immutable)\'');

    // Créer la fonction et le trigger
    $this->addSql('CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
        BEGIN
            PERFORM pg_notify(\'messenger_messages\', NEW.queue_name::text);
            RETURN NEW;
        END;
    $$ LANGUAGE plpgsql;');
    $this->addSql('DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;');
    $this->addSql('CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();');
}


    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE client_id_seq CASCADE');
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
