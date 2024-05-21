import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"password-manager-1a8df","appId":"1:311492456991:web:8c5a9cde117a019eb35b2a","storageBucket":"password-manager-1a8df.appspot.com","apiKey":"AIzaSyDqtL1U6cJe0y2YB4LGSoGDrKk8DQ8vmZs","authDomain":"password-manager-1a8df.firebaseapp.com","messagingSenderId":"311492456991"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
