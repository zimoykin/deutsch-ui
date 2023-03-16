/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BACKEND_AUTH_PROD: string
  readonly VITE_BACKEND_AUTH_STAGE: string
  readonly VITE_BACKEND_AUTH_DEV: string
  readonly VITE_BACKEND_SVC_PROD: string
  readonly VITE_BACKEND_SVC_DEV: string
  readonly VITE_BACKEND_SVC_STAGE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
