import React from 'react';
import { User, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentUser: any;
  onLogout: () => void;
}

export default function Header({ currentPage, onNavigate, currentUser, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <div className="bg-blue-700 text-white p-2 rounded-lg mr-3">
              <User className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">ServiPerú</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {!currentUser ? (
              <>
                <button
                  onClick={() => handleNavigation('home')}
                  className={`text-gray-700 hover:text-blue-700 font-medium ${
                    currentPage === 'home' ? 'text-blue-700' : ''
                  }`}
                >
                  Inicio
                </button>
                <button
                  onClick={() => handleNavigation('register')}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Buscar Servicio
                </button>
                <button
                  onClick={() => handleNavigation('register')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Ofrecer Servicio
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation(currentUser.type === 'client' ? 'client-dashboard' : 'worker-dashboard')}
                  className={`text-gray-700 hover:text-blue-700 font-medium ${
                    currentPage.includes('dashboard') ? 'text-blue-700' : ''
                  }`}
                >
                  Panel Principal
                </button>
                <button
                  onClick={() => handleNavigation('subscriptions')}
                  className={`text-gray-700 hover:text-blue-700 font-medium ${
                    currentPage === 'subscriptions' ? 'text-blue-700' : ''
                  }`}
                >
                  Suscripciones
                </button>
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <p className="text-gray-900 font-medium">{currentUser.name}</p>
                    <p className="text-gray-500 capitalize">{currentUser.type}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2">
              {!currentUser ? (
                <>
                  <button
                    onClick={() => handleNavigation('home')}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-700 font-medium w-full text-left"
                  >
                    Inicio
                  </button>
                  <button
                    onClick={() => handleNavigation('register')}
                    className="block w-full text-left bg-blue-700 text-white px-3 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Buscar Servicio
                  </button>
                  <button
                    onClick={() => handleNavigation('register')}
                    className="block w-full text-left bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Ofrecer Servicio
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigation(currentUser.type === 'client' ? 'client-dashboard' : 'worker-dashboard')}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-700 font-medium w-full text-left"
                  >
                    Panel Principal
                  </button>
                  <button
                    onClick={() => handleNavigation('subscriptions')}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-700 font-medium w-full text-left"
                  >
                    Suscripciones
                  </button>
                  <div className="px-3 py-2 border-t border-gray-200 mt-2">
                    <p className="text-gray-900 font-medium">{currentUser.name}</p>
                    <p className="text-gray-500 capitalize text-sm">{currentUser.type}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="block px-3 py-2 text-gray-700 hover:text-red-700 font-medium w-full text-left"
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}