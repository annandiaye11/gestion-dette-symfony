<?php

namespace App\Repository;

use App\DTO\ClientSearch;
use App\Entity\Client;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ClientRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Client::class);
    }

    public function findByCriteria(ClientSearch $search, int $page = 1, int $limit = 10)
    {
        $qb = $this->createQueryBuilder('c');

        if ($search->getTelephone()) {
            $qb->andWhere('c.telephone LIKE :telephone')
               ->setParameter('telephone', '%'.$search->getTelephone().'%');
        }

        if ($search->getSurname() && $search->getSurname() != '') {
            $qb->andWhere('c.surname LIKE :surname')
               ->setParameter('surname', '%'.$search->getSurname().'%');
        }

        if ($search->getCompte() !== null) {
            $qb->andWhere('c.compte = :compte')
               ->setParameter('compte', $search->getCompte());
        }

        return $qb
            ->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }
}
