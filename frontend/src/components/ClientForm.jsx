import { useState } from 'react';
import PropTypes from 'prop-types';
import { Plus } from 'lucide-react';

export default function ClientForm({ addClient }) {
    const [newClient, setNewClient] = useState({ surname: '', telephone: '', adresse: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addClient(newClient);
        setNewClient({ surname: '', telephone: '', adresse: '' });
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-blue-400">Create New Client</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    id="surname"
                    name="surname"
                    placeholder="Surname"
                    value={newClient.surname}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 text-gray-100 bg-gray-700 border-gray-600 rounded focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    placeholder="Telephone"
                    value={newClient.telephone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 text-gray-100 bg-gray-700 border-gray-600 rounded focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                    id="adresse"
                    name="adresse"
                    placeholder="Adresse"
                    value={newClient.adresse}
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
// Validation des props
ClientForm.propTypes = {
    addClient: PropTypes.func.isRequired,
};