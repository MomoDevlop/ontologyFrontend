import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { instrumentsApi } from '@/services/api';
import type {
  CreateInstrumentData,
  UpdateInstrumentData,
  SearchFilters,
} from '@/types/api';

// Hook pour récupérer tous les instruments
export const useInstruments = (options?: {
  page?: number;
  limit?: number;
  search?: string;
  filters?: SearchFilters;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ['instruments', options],
    queryFn: () => instrumentsApi.getAll(options),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: options?.enabled !== false,
  });
};

// Hook pour récupérer un instrument par ID
export const useInstrument = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['instruments', id],
    queryFn: () => instrumentsApi.getById(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook pour récupérer un instrument avec ses relations
export const useInstrumentWithRelations = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['instruments', id, 'relations'],
    queryFn: () => instrumentsApi.getWithRelations(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook pour créer un instrument
export const useCreateInstrument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateInstrumentData) => instrumentsApi.create(data),
    onSuccess: () => {
      // Invalider le cache des instruments pour recharger la liste
      queryClient.invalidateQueries(['instruments']);
      queryClient.invalidateQueries(['instruments', 'statistics']);
    },
  });
};

// Hook pour mettre à jour un instrument
export const useUpdateInstrument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateInstrumentData }) => 
      instrumentsApi.update(id, data),
    onSuccess: (response, { id }) => {
      // Mettre à jour le cache de l'instrument spécifique
      queryClient.setQueryData(['instruments', id], response);
      queryClient.invalidateQueries(['instruments']);
      queryClient.invalidateQueries(['instruments', id, 'relations']);
    },
  });
};

// Hook pour supprimer un instrument
export const useDeleteInstrument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => instrumentsApi.delete(id),
    onSuccess: (_, id) => {
      // Supprimer du cache et invalider les listes
      queryClient.removeQueries(['instruments', id]);
      queryClient.invalidateQueries(['instruments']);
      queryClient.invalidateQueries(['instruments', 'statistics']);
    },
  });
};

// Hook pour les statistiques des instruments
export const useInstrumentStatistics = () => {
  return useQuery({
    queryKey: ['instruments', 'statistics'],
    queryFn: () => instrumentsApi.getStatistics(),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Hook pour la recherche avancée
export const useAdvancedSearch = (filters: SearchFilters, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['instruments', 'search', filters],
    queryFn: () => instrumentsApi.advancedSearch(filters),
    enabled: enabled && Object.keys(filters).length > 0,
    keepPreviousData: true,
  });
};

// Hook pour les instruments par famille
export const useInstrumentsByFamily = (family: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['instruments', 'by-family', family],
    queryFn: () => instrumentsApi.getByFamily(family),
    enabled: enabled && !!family,
    staleTime: 10 * 60 * 1000,
  });
};

// Hook pour les instruments par groupe ethnique
export const useInstrumentsByEthnicGroup = (group: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['instruments', 'by-group', group],
    queryFn: () => instrumentsApi.getByEthnicGroup(group),
    enabled: enabled && !!group,
    staleTime: 10 * 60 * 1000,
  });
};

// Hook pour les instruments similaires
export const useSimilarInstruments = (id: number, limit: number = 5, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['instruments', id, 'similar', limit],
    queryFn: () => instrumentsApi.getSimilar(id, limit),
    enabled: enabled && !!id,
    staleTime: 15 * 60 * 1000,
  });
};

// Hook personnalisé pour gérer l'état de recherche
export const useInstrumentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce pour la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchResults = useInstruments({
    search: debouncedSearchTerm,
    filters,
  });

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    searchResults,
    isSearching: searchResults.isLoading,
  };
};

// Hook pour la pagination
export const useInstrumentPagination = (initialLimit: number = 10) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const instruments = useInstruments({ page, limit });

  const totalPages = instruments.data?.pagination.total 
    ? Math.ceil(instruments.data.pagination.total / limit)
    : 0;

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const nextPage = () => goToPage(page + 1);
  const prevPage = () => goToPage(page - 1);

  return {
    page,
    limit,
    totalPages,
    setPage: goToPage,
    setLimit,
    nextPage,
    prevPage,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    instruments,
  };
};