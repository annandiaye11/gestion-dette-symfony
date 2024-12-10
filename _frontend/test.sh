#!/bin/bash

# Variables
components_dir="./src/components"
main_component="./src/DarkThemeClientManagementPage.jsx"

# Création du dossier des composants
echo "Création du dossier des composants..."
mkdir -p $components_dir

# Header.js
cat <<EOL > $components_dir/Header.jsx
import React from 'react';

export default function Header() {
    return (
        <header className="flex items-center justify-between p-6 bg-gray-800 shadow-lg">
            <h1 className="text-3xl font-bold text-blue-400">Manage my shop</h1>
            <div className="flex items-center space-x-60">
                <input
                    type="text"
                    placeholder="Rechercher dans votre boutique..."
                    className="p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-full w-80 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <div className="flex items-center space-x-2">
                    <img
                        src="https://via.placeholder.com/40" 
                        alt="Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="text-sm font-semibold text-gray-300">OUSSEYNOU DIEDHIOU</span>
                </div>
            </div>
        </header>
    );
}
EOL

# Sidebar.js
cat <<EOL > $components_dir/Sidebar.jsx
import React from 'react';

export default function Sidebar() {
    return (
        <aside className="w-64 p-6 space-y-6 bg-gray-800">
            <nav>
                <ul className="space-y-6">
                    <li><a href="#" className="flex items-center space-x-2 text-gray-300 transition-colors duration-200 hover:text-blue-400"><span>🏠 Dashboard</span></a></li>
                    <li><a href="#" className="flex items-center space-x-2 text-gray-300 transition-colors duration-200 hover:text-blue-400"><span>👥 Clients</span></a></li>
                    <li><a href="#" className="flex items-center space-x-3 text-gray-100 transition-colors duration-200 hover:text-blue-400"><span className="font-semibold">💲Dettes</span></a></li>
                    <li><a href="#" className="flex items-center space-x-3 text-gray-100 transition-colors duration-200 hover:text-blue-400"><span className="font-semibold">📦 Articles</span></a></li>
                    <li><a href="#" className="flex items-center space-x-3 text-gray-100 transition-colors duration-200 hover:text-blue-400"><span className="font-semibold">✉️ Demandes</span></a></li>
                    <li><a href="#" className="flex items-center space-x-3 text-gray-300 transition-colors duration-200 hover:text-blue-400"><span className="font-semibold">👤 Utilisateurs</span></a></li>
                </ul>
            </nav>
        </aside>
    );
}
EOL

# ClientForm.js
cat <<EOL > $components_dir/ClientForm.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function ClientForm({ addClient }) {
    const [newClient, setNewClient] = useState({ name: '', email: '', notes: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addClient(newClient);
        setNewClient({ name: '', email: '', notes: '' });
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-blue-400">Create New Client</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={newClient.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 text-gray-100 bg-gray-700 border-gray-600 rounded focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={newClient.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 text-gray-100 bg-gray-700 border-gray-600 rounded focus:border-blue-500 focus:ring-blue-500"
                />
                <textarea
                    id="notes"
                    name="notes"
                    placeholder="Notes"
                    value={newClient.notes}
                    onChange={handleInputChange}
                    className="w-full p-2 text-gray-100 bg-gray-700 border-gray-600 rounded focus:border-blue-500 focus:ring-blue-500"
                />
                <button type="submit" className="flex items-center justify-center w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" /> Create Client
                </button>
            </form>
        </div>
    );
}
EOL

# ClientList.js
cat <<EOL > $components_dir/ClientList.jsx
import React from 'react';
import { Trash2 } from 'lucide-react';

export default function ClientList({ clients, deleteClient }) {
    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg h-[70vh] overflow-scroll">
            <h2 className="mb-4 text-2xl font-semibold text-blue-400">Client List</h2>
            <ul className="space-y-4">
                {clients.map(client => (
                    <li key={client.id} className={\`\${client.color} p-4 rounded-lg shadow-md flex justify-between items-center\`}>
                        <div>
                            <strong className="font-semibold text-gray-100">{client.name}</strong>
                            <p className="text-gray-300">{client.email}</p>
                        </div>
                        <button onClick={() => deleteClient(client.id)} className="p-2 text-gray-300 rounded hover:text-red-400 hover:bg-gray-700">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
EOL

# Footer.js
cat <<EOL > $components_dir/Footer.jsx
import React from 'react';

export default function Footer() {
    return (
        <footer className="pt-5 text-center text-gray-400 bg-gray-800">
            <p className="mb-2">&copy; 2024 Debt Management App. All rights reserved.</p>
        </footer>
    );
}
EOL

# Main component DarkThemeClientManagementPage.js
cat <<EOL > $main_component
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import Footer from './components/Footer';

export default function DarkThemeClientManagementPage() {
    const [clients, setClients] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', color: 'bg-blue-900' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', color: 'bg-purple-900' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', color: 'bg-green-900' },
    ]);

    const addClient = (newClient) => {
        const colors = ['bg-blue-900', 'bg-purple-900', 'bg-green-900', 'bg-red-900', 'bg-yellow-900'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setClients(prev => [...prev, { id: prev.length + 1, ...newClient, color: randomColor }]);
    };

    const deleteClient = (id) => {
        setClients(prev => prev.filter(client => client.id !== id));
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
EOL

# Mise à jour du fichier principal
echo "import React from 'react';" > ./src/App.jsx
echo "import DarkThemeClientManagementPage from './DarkThemeClientManagementPage';" >> ./src/App.jsx
echo "function App() { return <DarkThemeClientManagementPage />; } export default App;" >> ./src/App.jsx

# Lancer le projet
npm run dev
