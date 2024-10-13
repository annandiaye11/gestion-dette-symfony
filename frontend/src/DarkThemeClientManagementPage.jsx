import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import Footer from './components/Footer';

export default function DarkThemeClientManagementPage() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/clients');
                setClients(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des clients :", error);
            }
        };
        fetchClients();
    }, []);

    const addClient = async (newClient) => {
        try {
            const response = await axios.post('http://localhost:8000/api/clients', {
                surname: newClient.surname,
                telephone: newClient.telephone,
                adresse: newClient.adresse
            });
            const createdClient = response.data.client;
            setClients(prev => [...prev, createdClient]);
        } catch (error) {
            console.error("Erreur lors de l'ajout du client :", error);
        }
    };

    const deleteClient = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/clients/${id}`);
            setClients(prev => prev.filter(client => client.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression du client :", error);
        }
    };

    return (
        <div className="flex flex-col min-h-[100vh] text-gray-100 bg-gray-900">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 space-y-6">
                    <div className="flex gap-6">
                        <ClientForm addClient={addClient} />
                        <ClientList clients={clients} deleteClient={deleteClient} />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
