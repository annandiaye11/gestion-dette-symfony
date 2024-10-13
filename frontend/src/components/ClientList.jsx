import { Trash2 } from 'lucide-react';

export default function ClientList({ clients, deleteClient }) {
    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg h-[70vh] w-[30vw] overflow-scroll">
            <h2 className="mb-4 text-2xl font-semibold text-blue-400">Client List</h2>
            <ul className="space-y-4">
                {clients.map(client => (
                    <li key={client.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md">
                        <div>
                            <strong className="font-semibold text-gray-100">{client.surname}</strong>
                            <p className="text-gray-300">Téléphone: {client.telephone}</p>
                            <p className="text-gray-300">Adresse: {client.adresse}</p>
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
