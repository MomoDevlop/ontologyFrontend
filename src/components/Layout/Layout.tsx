import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  MusicalNoteIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ChartBarIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Accueil', href: '/', icon: HomeIcon },
  { name: 'Instruments', href: '/instruments', icon: MusicalNoteIcon },
  { name: 'Recherche', href: '/search', icon: MagnifyingGlassIcon },
  { name: 'Carte', href: '/map', icon: MapPinIcon },
  { name: 'Statistiques', href: '/statistics', icon: ChartBarIcon },
  { name: 'Relations', href: '/relations', icon: LinkIcon },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation mobile */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
          <Link to="/" className="flex items-center space-x-2">
            <MusicalNoteIcon className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">
              Ontologie Musicale
            </span>
          </Link>
          
          <button
            type="button"
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black bg-opacity-50"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menu mobile */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <span className="text-lg font-semibold text-gray-900">
                    Menu
                  </span>
                  <button
                    type="button"
                    className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <nav className="px-4 py-4">
                  <ul className="space-y-2">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            isActiveRoute(item.href)
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Layout desktop */}
      <div className="hidden lg:flex lg:h-screen">
        {/* Sidebar */}
        <div className="flex w-64 flex-col bg-white shadow-sm">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <MusicalNoteIcon className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">
                Ontologie Musicale
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActiveRoute(item.href)
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer de la sidebar */}
          <div className="border-t p-4">
            <div className="text-xs text-gray-500">
              <p>Ontologie des Instruments</p>
              <p>Version 1.0.0</p>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {navigation.find(item => isActiveRoute(item.href))?.name || 'Accueil'}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Explorez l'ontologie des instruments de musique
                  </p>
                </div>

                {/* Actions du header */}
                <div className="flex items-center space-x-4">
                  {/* Indicateur de statut API */}
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-xs text-gray-500">API connectée</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Contenu principal */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="h-full">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Layout mobile - contenu principal */}
      <div className="lg:hidden">
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;