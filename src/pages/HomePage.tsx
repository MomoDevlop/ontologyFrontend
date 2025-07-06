import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MusicalNoteIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ChartBarIcon,
  LinkIcon,
  ArrowRightIcon,
  GlobeAsiaAustraliaIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

// Hooks
import { useInstrumentStatistics } from '@/hooks/useInstruments';
import { useAllEntities } from '@/hooks/useEntities';

// Components
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import ErrorMessage from '@/components/UI/ErrorMessage';
import StatCard from '@/components/UI/StatCard';

const HomePage: React.FC = () => {
  const { data: statistics, isLoading: statsLoading, error: statsError } = useInstrumentStatistics();
  const { familles, groupesEthniques, localites, materiaux, isLoading: entitiesLoading } = useAllEntities();

  const quickActions = [
    {
      name: 'Explorer les Instruments',
      description: 'Découvrez notre collection d\'instruments de musique',
      href: '/instruments',
      icon: MusicalNoteIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Recherche Sémantique',
      description: 'Recherchez par critères avancés et relations',
      href: '/search',
      icon: MagnifyingGlassIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Carte Interactive',
      description: 'Explorez les instruments par localisation',
      href: '/map',
      icon: MapPinIcon,
      color: 'bg-purple-500',
    },
    {
      name: 'Analyse des Relations',
      description: 'Visualisez les connexions entre entités',
      href: '/relations',
      icon: LinkIcon,
      color: 'bg-orange-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  if (statsLoading || entitiesLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="p-6">
        <ErrorMessage 
          title="Erreur de chargement"
          message="Impossible de charger les statistiques"
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-8"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center py-12">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-primary-100 p-4">
            <MusicalNoteIcon className="h-16 w-16 text-primary-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Ontologie des Instruments de Musique
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Explorez une base de connaissances sémantique complète sur les instruments de musique, 
          leurs origines culturelles, leurs relations et leur patrimoine musical.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/instruments"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Commencer l'exploration
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
          
          <Link
            to="/search"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border border-primary-600 hover:bg-primary-50 transition-colors"
          >
            Recherche avancée
            <MagnifyingGlassIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </motion.div>

      {/* Statistiques */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Vue d'ensemble</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Instruments"
            value={statistics?.data.totalInstruments || 0}
            icon={MusicalNoteIcon}
            color="blue"
            description="Instruments référencés"
          />
          
          <StatCard
            title="Familles"
            value={familles.length}
            icon={UserGroupIcon}
            color="green"
            description="Familles d'instruments"
          />
          
          <StatCard
            title="Localités"
            value={localites.length}
            icon={GlobeAsiaAustraliaIcon}
            color="purple"
            description="Régions géographiques"
          />
          
          <StatCard
            title="Groupes Ethniques"
            value={groupesEthniques.length}
            icon={SparklesIcon}
            color="orange"
            description="Communautés culturelles"
          />
        </div>
      </motion.div>

      {/* Actions rapides */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Actions rapides</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="group relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`rounded-lg p-3 ${action.color} text-white group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    {action.name}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {action.description}
                  </p>
                </div>
                
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Répartition par famille */}
      {statistics?.data.familles && (
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Répartition par famille</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statistics.data.familles.map((famille, index) => (
                <Link
                  key={famille}
                  to={`/instruments?famille=${famille}`}
                  className="text-center p-4 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-colors group"
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-primary-${100 + index * 100} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <MusicalNoteIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <p className="font-medium text-gray-900 group-hover:text-primary-600">
                    {famille}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Récents ajouts ou suggestions */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-r from-primary-500 to-secondary-600 rounded-xl text-white p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Découvrez les relations sémantiques</h2>
              <p className="text-primary-100">
                Notre ontologie utilise des relations complexes pour connecter les instruments à leur contexte culturel et géographique.
              </p>
            </div>
            
            <div className="mt-6 md:mt-0">
              <Link
                to="/statistics"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Voir les statistiques
                <ChartBarIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;