import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import Footer from './components/Footer';

export default function DarkThemeClientManagementPage() {
    const [clients, setClients] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(3);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchClients = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/clients/search', {
                params: {
                    search: searchTerm,
                    page: page,
                    limit: limit
                }
            });
            setClients(response.data.clients);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Erreur lors de la récupération des clients :", error);
        }
    }, [searchTerm, page, limit]);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    const addClient = async (newClient) => {
        try {
            const response = await axios.post('http://localhost:8000/api/clients', {
                surname: newClient.surname,
                telephone: newClient.telephone,
                adresse: newClient.adresse
            });
            const createdClient = response.data.client;
            setClients(prev => [...prev, createdClient]);
            fetchClients(); // Refresh the list after adding a new client
        } catch (error) {
            console.error("Erreur lors de l'ajout du client :", error);
        }
    };

    const deleteClient = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/clients/${id}`);
            fetchClients(); // Refresh the list after deleting a client
        } catch (error) {
            console.error("Erreur lors de la suppression du client :", error);
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setPage(1); // Reset to first page when searching
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="flex flex-col min-h-[100vh] text-gray-100 bg-gray-900">
            <Header onSearch={handleSearch}/>
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 space-y-6">
                    <div className="flex gap-6">
                        <ClientForm addClient={addClient} />
                        <ClientList
                            clients={clients}
                            deleteClient={deleteClient}
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}