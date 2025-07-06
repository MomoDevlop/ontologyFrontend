import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import type {
  ApiResponse,
  PaginatedResponse,
  Instrument,
  InstrumentWithRelations,
  Famille,
  GroupeEthnique,
  Rythme,
  Localite,
  Materiau,
  CreateInstrumentData,
  UpdateInstrumentData,
  CreateRelationData,
  SearchFilters,
  GeographicSearchParams,
  GlobalSearchResponse,
  GeographicSearchResult,
  SimilarEntity,
  CulturalPattern,
  CentralityAnalysis,
  Statistics,
  RelationStatistics,
  RelationTypeInfo,
  EntityRelations
} from '@/types/api';

// Configuration Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Erreur réseau';
    console.error('Erreur API:', message);
    toast.error(message);
    return Promise.reject(error);
  }
);

// Intercepteur pour les requêtes (logging en développement)
if (import.meta.env.DEV) {
  api.interceptors.request.use((config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  });
}

// Service pour les instruments
export const instrumentsApi = {
  // Récupérer tous les instruments
  getAll: async (options?: {
    page?: number;
    limit?: number;
    search?: string;
    filters?: SearchFilters;
  }): Promise<PaginatedResponse<Instrument>> => {
    const params = new URLSearchParams();
    
    if (options?.page) params.append('page', options.page.toString());
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.search) params.append('search', options.search);
    
    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const response: AxiosResponse<PaginatedResponse<Instrument>> = await api.get(
      `/instruments?${params.toString()}`
    );
    return response.data;
  },

  // Récupérer un instrument par ID
  getById: async (id: number): Promise<ApiResponse<Instrument>> => {
    const response: AxiosResponse<ApiResponse<Instrument>> = await api.get(`/instruments/${id}`);
    return response.data;
  },

  // Récupérer un instrument avec ses relations
  getWithRelations: async (id: number): Promise<ApiResponse<InstrumentWithRelations>> => {
    const response: AxiosResponse<ApiResponse<InstrumentWithRelations>> = await api.get(
      `/instruments/${id}/relations`
    );
    return response.data;
  },

  // Créer un nouvel instrument
  create: async (data: CreateInstrumentData): Promise<ApiResponse<Instrument>> => {
    const response: AxiosResponse<ApiResponse<Instrument>> = await api.post('/instruments', data);
    toast.success('Instrument créé avec succès !');
    return response.data;
  },

  // Mettre à jour un instrument
  update: async (id: number, data: UpdateInstrumentData): Promise<ApiResponse<Instrument>> => {
    const response: AxiosResponse<ApiResponse<Instrument>> = await api.put(`/instruments/${id}`, data);
    toast.success('Instrument mis à jour avec succès !');
    return response.data;
  },

  // Supprimer un instrument
  delete: async (id: number): Promise<ApiResponse<any>> => {
    const response: AxiosResponse<ApiResponse<any>> = await api.delete(`/instruments/${id}`);
    toast.success('Instrument supprimé avec succès !');
    return response.data;
  },

  // Récupérer les statistiques
  getStatistics: async (): Promise<ApiResponse<Statistics>> => {
    const response: AxiosResponse<ApiResponse<Statistics>> = await api.get('/instruments/statistics');
    return response.data;
  },

  // Recherche avancée
  advancedSearch: async (filters: SearchFilters): Promise<ApiResponse<Instrument[]>> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response: AxiosResponse<ApiResponse<Instrument[]>> = await api.get(
      `/instruments/search?${params.toString()}`
    );
    return response.data;
  },

  // Instruments par famille
  getByFamily: async (family: string): Promise<ApiResponse<Array<{ instrument: Instrument; famille: Famille }>>> => {
    const response = await api.get(`/instruments/by-family/${encodeURIComponent(family)}`);
    return response.data;
  },

  // Instruments par groupe ethnique
  getByEthnicGroup: async (group: string): Promise<ApiResponse<Array<{ instrument: Instrument; groupeEthnique: GroupeEthnique }>>> => {
    const response = await api.get(`/instruments/by-group/${encodeURIComponent(group)}`);
    return response.data;
  },

  // Instruments similaires
  getSimilar: async (id: number, limit: number = 5): Promise<ApiResponse<SimilarEntity[]>> => {
    const response: AxiosResponse<ApiResponse<SimilarEntity[]>> = await api.get(
      `/instruments/${id}/similar?limit=${limit}`
    );
    return response.data;
  },
};

// Service pour les autres entités
export const entitiesApi = {
  // Familles
  familles: {
    getAll: async (): Promise<PaginatedResponse<Famille>> => {
      const response = await api.get('/familles');
      return response.data;
    },
    create: async (data: { nomFamille: string }): Promise<ApiResponse<Famille>> => {
      const response = await api.post('/familles', data);
      toast.success('Famille créée avec succès !');
      return response.data;
    },
  },

  // Groupes ethniques
  groupesEthniques: {
    getAll: async (): Promise<PaginatedResponse<GroupeEthnique>> => {
      const response = await api.get('/groupes-ethniques');
      return response.data;
    },
    create: async (data: { nomGroupe: string; langue?: string }): Promise<ApiResponse<GroupeEthnique>> => {
      const response = await api.post('/groupes-ethniques', data);
      toast.success('Groupe ethnique créé avec succès !');
      return response.data;
    },
  },

  // Localités
  localites: {
    getAll: async (): Promise<PaginatedResponse<Localite>> => {
      const response = await api.get('/localites');
      return response.data;
    },
    create: async (data: { nomLocalite: string; latitude: number; longitude: number }): Promise<ApiResponse<Localite>> => {
      const response = await api.post('/localites', data);
      toast.success('Localité créée avec succès !');
      return response.data;
    },
  },

  // Rythmes
  rythmes: {
    getAll: async (): Promise<PaginatedResponse<Rythme>> => {
      const response = await api.get('/rythmes');
      return response.data;
    },
    create: async (data: { nomRythme: string; tempoBPM?: number }): Promise<ApiResponse<Rythme>> => {
      const response = await api.post('/rythmes', data);
      toast.success('Rythme créé avec succès !');
      return response.data;
    },
  },

  // Matériaux
  materiaux: {
    getAll: async (): Promise<PaginatedResponse<Materiau>> => {
      const response = await api.get('/materiaux');
      return response.data;
    },
    create: async (data: { nomMateriau: string; typeMateriau?: string }): Promise<ApiResponse<Materiau>> => {
      const response = await api.post('/materiaux', data);
      toast.success('Matériau créé avec succès !');
      return response.data;
    },
  },
};

// Service pour les relations
export const relationsApi = {
  // Types de relations disponibles
  getTypes: async (): Promise<ApiResponse<RelationTypeInfo[]>> => {
    const response = await api.get('/relations/types');
    return response.data;
  },

  // Statistiques des relations
  getStatistics: async (): Promise<ApiResponse<RelationStatistics>> => {
    const response = await api.get('/relations/statistics');
    return response.data;
  },

  // Relations d'une entité
  getEntityRelations: async (entityId: number): Promise<ApiResponse<EntityRelations>> => {
    const response = await api.get(`/relations/entity/${entityId}`);
    return response.data;
  },

  // Créer une relation
  create: async (data: CreateRelationData): Promise<ApiResponse<any>> => {
    const response = await api.post('/relations', data);
    toast.success('Relation créée avec succès !');
    return response.data;
  },

  // Valider une relation
  validate: async (data: CreateRelationData): Promise<ApiResponse<{ valid: boolean; error?: string }>> => {
    const response = await api.post('/relations/validate', data);
    return response.data;
  },

  // Supprimer une relation
  delete: async (sourceId: number, targetId: number, relationType: string): Promise<ApiResponse<any>> => {
    const response = await api.delete(`/relations/${sourceId}/${targetId}/${relationType}`);
    toast.success('Relation supprimée avec succès !');
    return response.data;
  },
};

// Service pour la recherche sémantique
export const searchApi = {
  // Recherche globale
  global: async (query: string, limit: number = 50): Promise<ApiResponse<GlobalSearchResponse>> => {
    const response = await api.get(`/search/global?q=${encodeURIComponent(query)}&limit=${limit}`);
    return response.data;
  },

  // Recherche géographique
  geographic: async (params: GeographicSearchParams): Promise<ApiResponse<{ results: GeographicSearchResult[] }>> => {
    const { lat, lng, radius = 100 } = params;
    const response = await api.get(`/search/geographic?lat=${lat}&lng=${lng}&radius=${radius}`);
    return response.data;
  },

  // Patterns culturels
  culturalPatterns: async (): Promise<ApiResponse<{ patterns: CulturalPattern[] }>> => {
    const response = await api.get('/search/cultural-patterns');
    return response.data;
  },

  // Analyse de centralité
  centrality: async (limit: number = 20): Promise<ApiResponse<{ centralityAnalysis: CentralityAnalysis[] }>> => {
    const response = await api.get(`/search/centrality?limit=${limit}`);
    return response.data;
  },

  // Recommandations
  recommendations: async (entityId: number, limit: number = 5): Promise<ApiResponse<{ recommendations: any[] }>> => {
    const response = await api.get(`/search/recommendations/${entityId}?limit=${limit}`);
    return response.data;
  },

  // Entités similaires
  similar: async (entityId: number, entityType: string, limit: number = 10): Promise<ApiResponse<{ similarEntities: SimilarEntity[] }>> => {
    const response = await api.get(`/search/similar/${entityId}?type=${entityType}&limit=${limit}`);
    return response.data;
  },
};

// Service pour la santé de l'API
export const healthApi = {
  // Santé du serveur
  server: async (): Promise<{ status: string; timestamp: string; uptime: number }> => {
    const response = await api.get('/health', { baseURL: 'http://localhost:3001' });
    return response.data;
  },

  // Santé de la base de données
  database: async (): Promise<{ status: string; database: string; message?: string }> => {
    const response = await api.get('/db-health', { baseURL: 'http://localhost:3001' });
    return response.data;
  },
};

// Utilitaires API
export const apiUtils = {
  // Test de connectivité
  testConnection: async (): Promise<boolean> => {
    try {
      await healthApi.server();
      return true;
    } catch {
      return false;
    }
  },

  // Retry automatique pour les requêtes échouées
  withRetry: async <T>(
    apiCall: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    let lastError: Error;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await apiCall();
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
      }
    }
    
    throw lastError!;
  },

  // Cache simple pour les données statiques
  cache: new Map<string, { data: any; timestamp: number; ttl: number }>(),
  
  // Méthode avec cache
  withCache: async <T>(
    key: string,
    apiCall: () => Promise<T>,
    ttl: number = 5 * 60 * 1000 // 5 minutes par défaut
  ): Promise<T> => {
    const cached = apiUtils.cache.get(key);
    const now = Date.now();
    
    if (cached && (now - cached.timestamp) < cached.ttl) {
      return cached.data as T;
    }
    
    const data = await apiCall();
    apiUtils.cache.set(key, { data, timestamp: now, ttl });
    return data;
  },

  // Nettoyage du cache
  clearCache: (pattern?: string) => {
    if (pattern) {
      const regex = new RegExp(pattern);
      Array.from(apiUtils.cache.keys())
        .filter(key => regex.test(key))
        .forEach(key => apiUtils.cache.delete(key));
    } else {
      apiUtils.cache.clear();
    }
  },
};

// Export par défaut
export default {
  instruments: instrumentsApi,
  entities: entitiesApi,
  relations: relationsApi,
  search: searchApi,
  health: healthApi,
  utils: apiUtils,
};