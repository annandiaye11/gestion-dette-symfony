document.addEventListener('DOMContentLoaded', () => {
    const clientForm = document.getElementById('client-form');
    const clientsList = document.getElementById('clients-list');
    const pagination = document.getElementById('pagination');
    const searchInput = document.getElementById('search-input');

    let page = 1;
    const limit = 3;
    let totalPages = 1;
    let searchTerm = '';

    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/clients/search', {
                params: {
                    search: searchTerm,
                    page: page,
                    limit: limit
                }
            });

            const { clients, totalPages: total } = response.data;
            totalPages = total;
            renderClients(clients);
            updatePagination();
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const renderClients = (clients) => {
        clientsList.innerHTML = clients.map(client => `
            <li class="flex justify-between items-center p-2 bg-gray-700 rounded-lg">
                <span>${client.surname}</span>
                <button class="text-red-500" onclick="deleteClient(${client.id})">Delete</button>
            </li>
        `).join('');
    };

    const updatePagination = () => {
        document.getElementById('prev-page').disabled = page <= 1;
        document.getElementById('next-page').disabled = page >= totalPages;
    };

    const handleSearch = () => {
        searchTerm = searchInput.value;
        page = 1; // Reset to first page when searching
        fetchClients();
    };

    const handlePageChange = (direction) => {
        if (direction === 'prev' && page > 1) page--;
        if (direction === 'next' && page < totalPages) page++;
        fetchClients();
    };

    const addClient = async (newClient) => {
        try {
            await axios.post('http://localhost:8000/api/clients', newClient);
            fetchClients(); // Refresh the list after adding a new client
        } catch (error) {
            console.error("Error adding client:", error);
        }
    };

    const deleteClient = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/clients/${id}`);
            fetchClients(); // Refresh the list after deleting a client
        } catch (error) {
            console.error("Error deleting client:", error);
        }
    };

    clientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newClient = {
            surname: document.getElementById('surname').value,
            telephone: document.getElementById('telephone').value,
            adresse: document.getElementById('adresse').value
        };
        addClient(newClient);
        clientForm.reset();
    });

    searchInput.addEventListener('input', handleSearch);
    document.getElementById('prev-page').addEventListener('click', () => handlePageChange('prev'));
    document.getElementById('next-page').addEventListener('click', () => handlePageChange('next'));

    fetchClients(); // Initial fetch
});
