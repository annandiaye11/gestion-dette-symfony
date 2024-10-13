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
