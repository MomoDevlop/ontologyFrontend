import { useQuery, useMutation, useQueryClient } from 'react-query';
import { entitiesApi } from '@/services/api';

// Hooks pour les familles
export const useFamilles = () => {
  return useQuery({
    queryKey: ['familles'],
    queryFn: () => entitiesApi.familles.getAll(),
    staleTime: 15 * 60 * 1000, // Les familles changent rarement
  });
};

export const useCreateFamille = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { nomFamille: string }) => entitiesApi.familles.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['familles']);
    },
  });
};

// Hooks pour les groupes ethniques
export const useGroupesEthniques = () => {
  return useQuery({
    queryKey: ['groupes-ethniques'],
    queryFn: () => entitiesApi.groupesEthniques.getAll(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateGroupeEthnique = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { nomGroupe: string; langue?: string }) => 
      entitiesApi.groupesEthniques.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['groupes-ethniques']);
    },
  });
};

// Hooks pour les localités
export const useLocalites = () => {
  return useQuery({
    queryKey: ['localites'],
    queryFn: () => entitiesApi.localites.getAll(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateLocalite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { nomLocalite: string; latitude: number; longitude: number }) => 
      entitiesApi.localites.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['localites']);
    },
  });
};

// Hooks pour les rythmes
export const useRythmes = () => {
  return useQuery({
    queryKey: ['rythmes'],
    queryFn: () => entitiesApi.rythmes.getAll(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateRythme = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { nomRythme: string; tempoBPM?: number }) => 
      entitiesApi.rythmes.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['rythmes']);
    },
  });
};

// Hooks pour les matériaux
export const useMateriaux = () => {
  return useQuery({
    queryKey: ['materiaux'],
    queryFn: () => entitiesApi.materiaux.getAll(),
    staleTime: 15 * 60 * 1000, // Les matériaux changent rarement
  });
};

export const useCreateMateriau = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { nomMateriau: string; typeMateriau?: string }) => 
      entitiesApi.materiaux.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['materiaux']);
    },
  });
};

// Hook combiné pour toutes les entités (utile pour les formulaires)
export const useAllEntities = () => {
  const familles = useFamilles();
  const groupesEthniques = useGroupesEthniques();
  const localites = useLocalites();
  const rythmes = useRythmes();
  const materiaux = useMateriaux();

  const isLoading = 
    familles.isLoading || 
    groupesEthniques.isLoading || 
    localites.isLoading || 
    rythmes.isLoading || 
    materiaux.isLoading;

  const isError = 
    familles.isError || 
    groupesEthniques.isError || 
    localites.isError || 
    rythmes.isError || 
    materiaux.isError;

  return {
    familles: familles.data?.data.data || [],
    groupesEthniques: groupesEthniques.data?.data.data || [],
    localites: localites.data?.data.data || [],
    rythmes: rythmes.data?.data.data || [],
    materiaux: materiaux.data?.data.data || [],
    isLoading,
    isError,
    refetchAll: () => {
      familles.refetch();
      groupesEthniques.refetch();
      localites.refetch();
      rythmes.refetch();
      materiaux.refetch();
    },
  };
};

// Hook pour obtenir les options de filtre
export const useFilterOptions = () => {
  const { familles, groupesEthniques, localites, materiaux } = useAllEntities();

  return {
    familleOptions: familles.map(f => ({ value: f.nomFamille, label: f.nomFamille })),
    groupeOptions: groupesEthniques.map(g => ({ value: g.nomGroupe, label: g.nomGroupe })),
    localiteOptions: localites.map(l => ({ value: l.nomLocalite, label: l.nomLocalite })),
    materiauOptions: materiaux.map(m => ({ value: m.nomMateriau, label: m.nomMateriau })),
  };
};