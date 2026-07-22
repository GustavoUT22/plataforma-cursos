// Tipos para las variables de entorno expuestas por @ngx-env/builder.
// Solo las variables con prefijo NG_APP_ están disponibles en el cliente.
declare interface ImportMetaEnv {
  readonly NG_APP_API_URL: string;
  [key: string]: string | undefined;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
