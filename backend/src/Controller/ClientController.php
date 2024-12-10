<?php

namespace App\Controller;

use App\Entity\Client;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ClientRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ClientController extends AbstractController
{
     #[Route('/api/clients', name: 'client_index', methods: ['GET'])]
     public function index(Request $request, ClientRepository $clientRepository): JsonResponse
     {
          $page = $request->query->getInt('page', 1);
          $limit = $request->query->getInt('limit', 3);

          $clients = $clientRepository->findBy([], [], $limit, ($page - 1) * $limit);
          $totalClients = $clientRepository->count([]);

          $data = [
               'clients' => [],
               'totalPages' => ceil($totalClients / $limit),
               'currentPage' => $page,
          ];

          foreach ($clients as $client) {
               $data['clients'][] = [
                    'id' => $client->getId(),
                    'telephone' => $client->getTelephone(),
                    'surname' => $client->getSurname(),
                    'adresse' => $client->getAdresse(),
               ];
          }

          return new JsonResponse($data);
     }

     #[Route('/api/clients/search', name: 'client_search', methods: ['GET'])]
     public function search(Request $request, ClientRepository $clientRepository, EntityManagerInterface $em): JsonResponse
     {
          $searchTerm = $request->query->get('search');
          $page = $request->query->getInt('page', 1);
          $limit = $request->query->getInt('limit', 3);

          $qb = $em->createQueryBuilder();
          $qb->select('c')
               ->from('App\Entity\Client', 'c')
               ->where($qb->expr()->orX(
                    $qb->expr()->like('c.surname', ':searchTerm'),
                    $qb->expr()->like('c.telephone', ':searchTerm'),
                    $qb->expr()->like('c.adresse', ':searchTerm')
               ))
               ->setParameter('searchTerm', '%' . $searchTerm . '%');

          $totalClients = count($qb->getQuery()->getResult());

          $qb->setFirstResult(($page - 1) * $limit)
               ->setMaxResults($limit);

          $clients = $qb->getQuery()->getResult();

          $data = [
               'clients' => [],
               'totalPages' => ceil($totalClients / $limit),
               'currentPage' => $page,
          ];

          foreach ($clients as $client) {
               $data['clients'][] = [
                    'id' => $client->getId(),
                    'telephone' => $client->getTelephone(),
                    'surname' => $client->getSurname(),
                    'adresse' => $client->getAdresse(),
               ];
          }

          return new JsonResponse($data);
     }

     #[Route('/api/clients', name: 'client_add', methods: ['POST'])]
     public function add(Request $request, EntityManagerInterface $entityManager): JsonResponse
     {
          $data = json_decode($request->getContent(), true);

          // Crée un nouvel objet Client et définit les propriétés
          $client = new Client();
          $client->setTelephone($data['telephone']);
          $client->setSurname($data['surname']);
          $client->setAdresse($data['adresse']);


          // Enregistre l'objet dans la base de données
          $entityManager->persist($client);
          $entityManager->flush();

          // Retourne une réponse JSON avec les informations du client créé
          return new JsonResponse([
               'status' => 'Client created successfully',
               'client' => [
                    'id' => $client->getId(),
                    'telephone' => $client->getTelephone(),
                    'surname' => $client->getSurname(),
                    'adresse' => $client->getAdresse(),
               ]
          ], JsonResponse::HTTP_CREATED);
     }

     #[Route('/api/clients/{id}', name: 'client_delete', methods: ['DELETE'])]
     public function delete(int $id, EntityManagerInterface $entityManager, ClientRepository $clientRepository): JsonResponse
     {
          $client = $clientRepository->find($id);

          if (!$client) {
               return new JsonResponse(['status' => 'Client not found'], JsonResponse::HTTP_NOT_FOUND);
          }

          $entityManager->remove($client);
          $entityManager->flush();

          return new JsonResponse(['status' => 'Client deleted successfully'], JsonResponse::HTTP_OK);
     }
}
