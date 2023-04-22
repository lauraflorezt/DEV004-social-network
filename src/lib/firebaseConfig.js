// Configuración Firebase al inicializar

import { initializeApp } from 'firebase/app';

import {
  getAuth,
} from 'firebase/auth';

const firebaseConfig = ({
  apiKey: 'AIzaSyBcpc0XpJaCMqOokhULjNp6Ul-AEaGc9CY',
  authDomain: 'social-network-c7eeb.firebaseapp.com',
  projectId: 'social-network-c7eeb',
  storageBucket: 'social-network-c7eeb.appspot.com',
  messagingSenderId: '118477723389',
  appId: '1:118477723389:web:452bdd1d47bf5805c45094',
});

// Se utiliza para inicializar una instancia de la aplicación de Firebase en una aplicación web
export const app = initializeApp(firebaseConfig);

// Se utiliza para obtener una instancia de Auth, que es el servicio de autenticación de Firebase
export const auth = getAuth(app);
