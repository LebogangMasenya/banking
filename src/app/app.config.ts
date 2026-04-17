import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { loansReducer } from './state/loans/loans.reducer';
import { characterLoansReducer } from './state/characters/characters.reducer';
import { localStorageSyncMetaReducer } from './state/state-sync.metareducer';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore({
      loanstore: loansReducer,
      characterloansstore: characterLoansReducer
    },
    {
      metaReducers: [localStorageSyncMetaReducer]
    }
),
  ],
};
