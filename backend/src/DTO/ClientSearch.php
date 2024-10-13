<?php

namespace App\DTO;

class ClientSearch
{
    private ?string $telephone = null;
    private ?string $surname = null;
    private ?bool $compte = null;

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): self
    {
        $this->telephone = $telephone;
        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(?string $surname): self
    {
        $this->surname = $surname;
        return $this;
    }

    public function getCompte(): ?bool
    {
        return $this->compte;
    }

    public function setCompte(?bool $compte): self
    {
        $this->compte = $compte;
        return $this;
    }
}
