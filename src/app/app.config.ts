import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient()
  ]
};


/**
 * 1- ApplicationConfig es una interfaz que define la configuración de la aplicación, en este caso estamos configurando los proveedores de la aplicación.
 * 2- provideBrowserGlobalErrorListeners es un proveedor que nos permite manejar los errores globales de la aplicación, como los errores de JavaScript o los errores de red.
 * 3- provideRouter es un proveedor que nos permite configurar las rutas de la aplicación, en este caso estamos pasando el array de rutas que definimos en app.routes.ts
 */