
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
