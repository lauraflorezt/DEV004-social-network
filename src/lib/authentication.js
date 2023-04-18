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

export const signInWithPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (email, password, displayName) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredentials.user, { displayName });
    const uid = userCredentials.user.uid;
    await saveUser({ userId: uid, email, name: displayName });
    return userCredentials;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const authGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

export const signOff = () => signOut(auth);
