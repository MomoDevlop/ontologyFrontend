/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_MAP_DEFAULT_CENTER_LAT: string
  readonly VITE_MAP_DEFAULT_CENTER_LNG: string
  readonly VITE_MAP_DEFAULT_ZOOM: string
  readonly VITE_ENABLE_DEV_TOOLS: string
  readonly VITE_DEBUG_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}