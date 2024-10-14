import PropTypes from 'prop-types';
import { Trash2 } from 'lucide-react';

export default function ClientList({ clients, deleteClient, currentPage, totalPages, onPageChange }) {
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
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-300">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

// Validation des props
ClientList.propTypes = {
    clients: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        surname: PropTypes.string.isRequired,
        telephone: PropTypes.string.isRequired,
        adresse: PropTypes.string.isRequired,
    })).isRequired,
    deleteClient: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};