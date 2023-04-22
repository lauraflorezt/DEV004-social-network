import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from 'firebase/firestore';
import { app } from './firebaseConfig';

// Es un método de Firebase que se utiliza para obtener una instancia de Firestore
const db = getFirestore(app);

// obtiene la marca de tiempo( fecha y hora ) del servidor Firebase
const getTimestamp = () => serverTimestamp();

// Agrega un nuevo documento a una colección en la base de datos de Firebase
const savePublic = (publicacion, likes, name, email, time) => addDoc(collection(db, 'publication'), {
  publicacion, likes, name, email, time,
});

// crea los usuarios en el firebase con la autenticación
const saveUser = (user) => addDoc(collection(db, 'publication'), user);

// onSnapshot función para escuchar los cambios de la colección, y el callback es la función
// que se va a ejecutar cuando hay un cambio en la colección. orderBy ordena por fecha desc
const postData = (callback) => onSnapshot(query(collection(db, 'publication'), orderBy('time', 'desc')), callback);

// borrar post
const deletePost = (id) => deleteDoc(doc(db, 'publication', id));

// Actualizan los post creados
const updatePost = (id, newDocument) => updateDoc(doc(db, 'publication', id), newDocument);

// Da y quita los likes dados por el usuario autentificado
const like = (docum, auth) => {
  const docRef = doc(db, 'publication', docum.id);
  return updateDoc(docRef, { likes: arrayUnion(auth.currentUser.uid) });
};

const dislike = (docum, auth) => {
  const docRef = doc(db, 'publication', docum.id);
  return updateDoc(docRef, { likes: arrayRemove(auth.currentUser.uid) });
};

export {
  db,
  savePublic,
  postData,
  deletePost,
  updatePost,
  getTimestamp,
  like,
  dislike,
  saveUser,
};
