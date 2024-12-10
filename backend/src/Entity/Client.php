<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
class Client
{
     #[ORM\Id]
     #[ORM\GeneratedValue]
     #[ORM\Column(type: 'integer')]
     private ?int $id = null;

     #[ORM\Column(type: 'string', length: 255)]
     #[Assert\NotBlank]
     #[Assert\Length(max: 255)]
     private ?string $telephone = null;

     #[ORM\Column(type: 'string', length: 255)]
     #[Assert\NotBlank]
     #[Assert\Length(max: 255)]
     private ?string $surname = null;

     #[ORM\Column(type: 'string', length: 255)]
     private ?string $adresse = null;

     // Getters et Setters

     public function getId(): ?int
     {
          return $this->id;
     }

     public function getTelephone(): ?string
     {
          return $this->telephone;
     }

     public function setTelephone(string $telephone): self
     {
          $this->telephone = $telephone;
          return $this;
     }

     public function getSurname(): ?string
     {
          return $this->surname;
     }

     public function setSurname(string $surname): self
     {
          $this->surname = $surname;
          return $this;
     }

     public function getAdresse(): ?string
     {
          return $this->adresse;
     }

     public function setAdresse(string $adresse): self
     {
          $this->adresse = $adresse;
          return $this;
     }
}
