import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';

const ACCESS_TOKEN_KEY = "access_token"

export const socketConfig: SocketIoConfig = {
  url: environment.backendUrl,
  options: {
    autoConnect: false,
    auth: {
      'Bearer': localStorage.getItem(ACCESS_TOKEN_KEY)
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(SocketIoModule.forRoot(socketConfig)), provideIonicAngular({})
  ],
};
