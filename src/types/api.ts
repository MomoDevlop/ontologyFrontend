// Types pour l'API de l'ontologie des instruments de musique

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    data: T[];
    total: number;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface Instrument {
  id: number;
  nomInstrument: string;
  description?: string;
  anneeCreation?: number;
}

export interface InstrumentWithRelations extends Instrument {
  relations: {
    familles: Famille[];
    groupesEthniques: GroupeEthnique[];
    rythmes: Rythme[];
    localites: Localite[];
    materiaux: Materiau[];
    techniques: TechniqueDeJeu[];
    artisans: Artisan[];
    timbres: Timbre[];
    patrimoines: PatrimoineCulturel[];
  };
}

export interface Famille {
  id: number;
  nomFamille: 'Cordes' | 'Vents' | 'Percussions' | 'Electrophones';
}

export interface GroupeEthnique {
  id: number;
  nomGroupe: string;
  langue?: string;
}

export interface Rythme {
  id: number;
  nomRythme: string;
  tempoBPM?: number;
}

export interface Localite {
  id: number;
  nomLocalite: string;
  latitude: number;
  longitude: number;
}

export interface Materiau {
  id: number;
  nomMateriau: string;
  typeMateriau?: string;
}

export interface Timbre {
  id: number;
  descriptionTimbre: string;
}

export interface TechniqueDeJeu {
  id: number;
  nomTechnique: string;
  descriptionTechnique?: string;
}

export interface Artisan {
  id: number;
  nomArtisan: string;
  anneesExperience?: number;
}

export interface PatrimoineCulturel {
  id: number;
  nomPatrimoine: string;
  descriptionPatrimoine?: string;
}

export interface Relation {
  source: Entity;
  target: Entity;
  relationType: RelationType;
}

export interface EntityRelations {
  entity: Entity;
  relations: {
    outgoing: RelationInfo[];
    incoming: RelationInfo[];
  };
}

export interface RelationInfo {
  type: RelationType;
  direction: 'IN' | 'OUT' | 'BOTH';
  entity: Entity;
  entityLabels: string[];
}

export type Entity = Instrument | Famille | GroupeEthnique | Rythme | Localite | Materiau | Timbre | TechniqueDeJeu | Artisan | PatrimoineCulturel;

export type RelationType = 
  | 'appartientA'
  | 'utilisePar'
  | 'produitRythme'
  | 'localiseA'
  | 'constitueDe'
  | 'joueAvec'
  | 'fabrique'
  | 'caracterise'
  | 'appliqueA'
  | 'englobe';

export interface RelationConstraint {
  from: string[];
  to: string[];
  cardinality: '1:1' | '1:N' | 'N:1' | 'N:N';
}

export interface RelationTypeInfo {
  type: RelationType;
  constraints: RelationConstraint;
}

export interface SearchResult {
  entity: Entity;
  labels: string[];
  name: string;
  type: string;
}

export interface GlobalSearchResponse {
  searchTerm: string;
  totalResults: number;
  results: Record<string, SearchResult[]>;
  allResults: SearchResult[];
}

export interface GeographicSearchResult {
  localite: Localite;
  distance: number;
  instruments: Instrument[];
  groupesEthniques: GroupeEthnique[];
  rythmes: Rythme[];
}

export interface SimilarEntity {
  entity: Entity;
  similarity: number;
}

export interface CulturalPattern {
  patrimoine: string;
  groupe: string;
  localite: string;
  instruments: string[];
  rythmes: string[];
  materiaux: string[];
  familles: string[];
}

export interface CentralityAnalysis {
  entity: Entity;
  type: string;
  centrality: number;
}

export interface Statistics {
  totalInstruments: number;
  totalFamilles: number;
  totalLocalites: number;
  totalMateriaux: number;
  familles: string[];
  localites: string[];
  materiaux: string[];
}

export interface RelationStatistics {
  totalRelations: number;
  relationTypes: Array<{
    type: RelationType;
    count: number;
  }>;
  availableRelationTypes: RelationType[];
}

// Types pour les formulaires
export interface CreateInstrumentData {
  nomInstrument: string;
  description?: string;
  anneeCreation?: number;
}

export interface UpdateInstrumentData extends Partial<CreateInstrumentData> {}

export interface CreateRelationData {
  sourceId: number;
  targetId: number;
  relationType: RelationType;
}

export interface SearchFilters {
  famille?: string;
  groupeEthnique?: string;
  localite?: string;
  materiau?: string;
  nom?: string;
  anneeMin?: number;
  anneeMax?: number;
}

export interface GeographicSearchParams {
  lat: number;
  lng: number;
  radius?: number;
}

// Types pour l'état de l'application
export interface AppState {
  instruments: Instrument[];
  familles: Famille[];
  groupesEthniques: GroupeEthnique[];
  localites: Localite[];
  selectedInstrument: Instrument | null;
  loading: boolean;
  error: string | null;
}

// Types pour les hooks
export interface UseInstrumentsOptions {
  page?: number;
  limit?: number;
  filters?: SearchFilters;
  search?: string;
}

export interface UseEntityOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

// Types pour les composants
export interface MapMarker {
  id: number;
  position: [number, number];
  name: string;
  instruments: Instrument[];
  popup?: React.ReactNode;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}