import PropTypes from 'prop-types';

export default function Header({ onSearch }) {
    const handleSearch = (e) => {
        onSearch(e.target.value);
    };

    return (
        <header className="flex items-center justify-between p-6 bg-gray-800 shadow-lg">
            <h1 className="text-3xl font-bold text-blue-400">Manage my shop</h1>
            <div className="flex items-center space-x-60">
                <input
                    type="text"
                    placeholder="       Rechercher dans votre boutique..."
                    onChange={handleSearch} // On appelle la fonction lors de la saisie
                    className="p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-full w-80 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <div className="flex items-center space-x-2">
                    <img
                        src="portrait-homme-style-anime-vue-laterale_23-2151067419.avif"
                        alt="Avatar"
                        className="w-12 h-12 rounded-full"
                    />
                    <span className="text-sm font-semibold text-gray-300">OUSSEYNOU DIEDHIOU</span>
                </div>
            </div>
        </header>
    );
}

// Validation des props
Header.propTypes = {
    onSearch: PropTypes.func.isRequired,
};