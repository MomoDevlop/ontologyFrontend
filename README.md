# Frontend - Ontologie des Instruments de Musique

Interface React moderne pour explorer l'ontologie des instruments de musique avec des fonctionnalités avancées de recherche sémantique, visualisation géographique et analyse de relations.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn
- API Backend fonctionnelle sur `http://localhost:3001`

### Installation
```bash
# Cloner et naviguer vers le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env

# Démarrer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🏗️ Architecture

### Structure des Dossiers
```
src/
├── components/          # Composants réutilisables
│   ├── Layout/         # Layout et navigation
│   ├── UI/             # Composants UI de base
│   ├── Forms/          # Formulaires
│   ├── Charts/         # Graphiques et visualisations
│   └── Maps/           # Cartes interactives
├── pages/              # Pages de l'application
├── hooks/              # Hooks React personnalisés
├── services/           # Services API
├── types/              # Types TypeScript
├── utils/              # Utilitaires
├── store/              # Gestion d'état (Zustand)
└── styles/             # Styles CSS globaux
```

### Technologies Utilisées
- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool moderne
- **Tailwind CSS** - Framework CSS utility-first
- **React Query** - Gestion d'état serveur
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Leaflet** - Cartes interactives
- **Recharts** - Graphiques
- **Axios** - Client HTTP

## 📱 Fonctionnalités

### Pages Principales

#### 🏠 Accueil (`/`)
- Dashboard avec statistiques générales
- Actions rapides vers les fonctionnalités principales
- Vue d'ensemble de l'ontologie

#### 🎵 Instruments (`/instruments`)
- Liste paginée des instruments
- Filtres par famille, groupe ethnique, localité
- Recherche textuelle en temps réel
- Création et modification d'instruments

#### 🔍 Recherche (`/search`)
- Recherche sémantique globale
- Filtres avancés multicritères
- Recherche géographique par rayon
- Patterns culturels

#### 🗺️ Carte (`/map`)
- Visualisation géographique des instruments
- Clustering intelligent des marqueurs
- Popups avec informations détaillées
- Filtres par région

#### 📊 Statistiques (`/statistics`)
- Graphiques de répartition
- Analyse de centralité du réseau
- Métriques d'usage
- Tendances temporelles

#### 🔗 Relations (`/relations`)
- Visualisation du graphe de connaissances
- Gestion des relations entre entités
- Validation des contraintes ontologiques
- Chemins sémantiques

### Composants Clés

#### 🎛️ Layout
- Navigation responsive
- Sidebar adaptative
- Header contextuel
- États de chargement globaux

#### 🧩 Composants UI
- **LoadingSpinner** - Indicateurs de chargement
- **ErrorMessage** - Gestion d'erreurs
- **StatCard** - Cartes de statistiques
- **Button** - Boutons avec variants
- **Badge** - Étiquettes colorées

#### 🗺️ Carte Interactive
- Intégration Leaflet
- Marqueurs personnalisés
- Popups riches
- Contrôles de zoom et couches

#### 📈 Graphiques
- Graphiques en barres, camemberts
- Graphiques de réseau pour les relations
- Animations fluides
- Responsive design

## 🔧 Configuration

### Variables d'Environnement
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api

# App Configuration
VITE_APP_NAME="Ontologie des Instruments de Musique"
VITE_MAP_DEFAULT_CENTER_LAT=14.6928
VITE_MAP_DEFAULT_CENTER_LNG=-17.4467

# Features
VITE_ENABLE_DEV_TOOLS=true
VITE_DEBUG_MODE=false
```

### Customisation Tailwind
Le thème peut être personnalisé dans `tailwind.config.js` :
- Couleurs primaires et secondaires
- Polices personnalisées
- Animations et transitions
- Breakpoints responsifs

## 🎨 Système de Design

### Palette de Couleurs
- **Primary** : Orange (#F0690A) - Actions principales
- **Secondary** : Bleu (#0EA5E9) - Actions secondaires  
- **Accent** : Violet (#D946EF) - Éléments d'accentuation
- **Gray** : Nuances de gris pour le texte et arrière-plans

### Typography
- **Sans-serif** : Inter (UI, corps de texte)
- **Serif** : Merriweather (titres, emphase)
- **Mono** : JetBrains Mono (code, données)

### Animations
- **Fade In** : Apparition progressive
- **Slide Up** : Glissement vers le haut
- **Scale In** : Zoom d'apparition
- **Hover Effects** : Micro-interactions

## 🧪 Development

### Scripts Disponibles
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation de la build
npm run lint         # Vérification ESLint
npm run type-check   # Vérification TypeScript
```

### Hooks Personnalisés

#### useInstruments
```typescript
const { data, isLoading, error } = useInstruments({
  page: 1,
  limit: 10,
  search: 'djembe',
  filters: { famille: 'Percussions' }
});
```

#### useAllEntities
```typescript
const { 
  familles, 
  groupesEthniques, 
  localites, 
  isLoading 
} = useAllEntities();
```

### Gestion d'État

#### React Query
- Cache intelligent des données API
- Synchronisation automatique
- Gestion des erreurs et retry
- Optimistic updates

#### Zustand (pour l'état global)
- Store léger et performant
- Pas de boilerplate
- DevTools intégrés
- TypeScript natif

## 📱 Responsive Design

### Breakpoints
- **Mobile** : < 640px
- **Tablet** : 640px - 1024px  
- **Desktop** : > 1024px

### Adaptations Mobile
- Navigation hamburger
- Cartes empilées
- Formulaires optimisés
- Touch-friendly buttons

## 🔍 Recherche et Filtrage

### Recherche Globale
- Recherche textuelle full-text
- Debouncing automatique
- Highlighting des résultats
- Suggestions intelligentes

### Filtres Avancés
- Combinaison de critères multiples
- Filtres par facettes
- Sauvegarde des préférences
- URL persistante

## 🗺️ Fonctionnalités Cartographiques

### Carte Interactive
- Tiles OpenStreetMap
- Marqueurs clusterisés
- Popups d'information
- Contrôles de navigation

### Recherche Géographique
- Recherche par rayon
- Sélection par région
- Géolocalisation automatique
- Export des données visibles

## 📊 Visualisations

### Types de Graphiques
- **Barres** : Répartition par famille
- **Camembert** : Proportions d'entités
- **Réseau** : Relations sémantiques
- **Timeline** : Évolution temporelle

### Interactivité
- Zoom et pan
- Tooltips informatifs
- Filtres dynamiques
- Export SVG/PNG

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```

### Variables d'Environnement de Production
```bash
VITE_API_BASE_URL=https://api.ontologie-musique.com/api
VITE_ENABLE_DEV_TOOLS=false
VITE_DEBUG_MODE=false
```

### Optimisations
- Code splitting automatique
- Tree shaking
- Compression des assets
- Lazy loading des composants

## 🔧 Troubleshooting

### Problèmes Courants

#### Erreur de connexion API
```bash
# Vérifier que l'API backend est démarrée
curl http://localhost:3001/health
```

#### Problèmes de style
```bash
# Rebuild Tailwind CSS
npm run build:css
```

#### Erreurs TypeScript
```bash
# Vérification des types
npm run type-check
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.