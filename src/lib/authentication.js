/* eslint-disable no-useless-catch */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebaseConfig';
import { saveUser } from './firestore';

// Hace ingreso de la app mediante email y contraseña
export const signInWithPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};

// Crea una cuenta nueva de correo electronico
export const registerWithEmail = async (email, password, displayName) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    // updateProfile es una función para actualizar el displayname y sea visible
    await updateProfile(userCredentials.user, { displayName });
    const uid = userCredentials.user.uid;
    await saveUser({ userId: uid, email, name: displayName });
    return userCredentials;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

// Ingresar a google
export const authGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

// cerrar sesión
export const signOff = () => signOut(auth);
