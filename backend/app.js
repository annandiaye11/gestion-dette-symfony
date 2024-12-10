const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// Middleware pour servir des fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// Middleware pour gérer le corps des requêtes POST (JSON)
app.use(express.json());

// Simuler une base de données de clients
let clients = [
    { id: 1, surname: 'Doe', telephone: '1234567890', adresse: '123 Street' },
    { id: 2, surname: 'Smith', telephone: '9876543210', adresse: '456 Avenue' },
    { id: 3, surname: 'Johnson', telephone: '5555555555', adresse: '789 Boulevard' },
];

// Route API pour récupérer les clients avec pagination et recherche
app.get('/api/clients/search', (req, res) => {
    const { search = '', page = 1, limit = 3 } = req.query;
    
    const filteredClients = clients.filter(client =>
        client.surname.toLowerCase().includes(search.toLowerCase())
    );
    
    const startIndex = (page - 1) * limit;
    const paginatedClients = filteredClients.slice(startIndex, startIndex + parseInt(limit));

    res.json({
        clients: paginatedClients,
        totalPages: Math.ceil(filteredClients.length / limit),
    });
});

// Route API pour ajouter un client
app.post('/api/clients', (req, res) => {
    const { surname, telephone, adresse } = req.body;
    const newClient = { id: clients.length + 1, surname, telephone, adresse };
    clients.push(newClient);
    res.status(201).json({ client: newClient });
});

// Route API pour supprimer un client
app.delete('/api/clients/:id', (req, res) => {
    const { id } = req.params;
    clients = clients.filter(client => client.id != id);
    res.status(204).send();
});

// Route pour servir la page d'accueil (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Démarrer le serveur Express
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
