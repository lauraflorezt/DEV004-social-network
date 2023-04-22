/* eslint-disable no-alert */
import {
  savePublic,
  postData,
  getTimestamp,
  deletePost,
  updatePost,
  like,
  dislike,
} from '../lib/firestore';
import { signOff } from '../lib/authentication';
import { auth } from '../lib/firebaseConfig';
import {
  homeHome,
  likeIcon,
  likedIcon,
  outOut,
  profileProfile,
  welcomePic,
} from './img';

export const timeline = (onNavigate) => {
  //* Aqui estamos creando lo que va en HTML.
  const bodyHTML = document.createElement('body');
  const headerHTML = document.createElement('header');
  const timelineSection = document.createElement('main');
  const feedSection = document.createElement('div');
  const headerTitle = document.createElement('nav');
  const createPostSection = document.createElement('section');
  const profileImg = document.createElement('img');
  const inputContainer = document.createElement('form');
  const inputPost = document.createElement('textarea');
  const postButton = document.createElement('button');
  const homeIcon = document.createElement('img');
  const profileIcon = document.createElement('img');
  const logOutIcon = document.createElement('img');
  const footerHMTL = document.createElement('footer');

  //* Estamos asignandi atributos para todos los elementos creados.
  bodyHTML.setAttribute('id', 'bodyHTML');
  headerHTML.setAttribute('id', 'headerHTML');
  timelineSection.setAttribute('id', 'timelineSection');
  feedSection.setAttribute('id', 'feedSection');
  createPostSection.setAttribute('id', 'createPostSection');
  headerTitle.setAttribute('id', 'headerTitle');
  headerTitle.textContent = 'Timeline';
  profileImg.setAttribute('id', 'profileImg');
  profileImg.src = welcomePic;
  inputContainer.setAttribute('id', 'inputContainer');
  inputPost.setAttribute('id', 'inputPost');
  inputPost.setAttribute('placeholder', 'Escribe tu mensaje');
  postButton.setAttribute('id', 'postButton');
  postButton.innerHTML = '<h3><b>Publicar</b></h1>';
  homeIcon.setAttribute('id', 'homeIcon');
  homeIcon.src = homeHome;
  homeIcon.setAttribute('alt', 'Home Icon');
  profileIcon.setAttribute('id', 'profileIcon');
  profileIcon.src = profileProfile;
  profileIcon.setAttribute('alt', 'Profile Icon');
  logOutIcon.setAttribute('id', 'logOutIcon');
  logOutIcon.src = outOut;
  logOutIcon.setAttribute('alt', 'LogOutIcon');
  footerHMTL.setAttribute('id', 'footerHTML');

  //* Aqui estamos agregando todo a la sección de SignInPage
  bodyHTML.appendChild(headerHTML);
  headerHTML.appendChild(headerTitle);
  bodyHTML.appendChild(timelineSection);
  timelineSection.appendChild(createPostSection);
  timelineSection.appendChild(feedSection);
  createPostSection.appendChild(profileImg);
  createPostSection.appendChild(inputContainer);
  inputContainer.appendChild(inputPost);
  inputContainer.appendChild(postButton);
  bodyHTML.appendChild(footerHMTL);
  footerHMTL.appendChild(homeIcon);
  footerHMTL.appendChild(profileIcon);
  footerHMTL.appendChild(logOutIcon);

  inputContainer.addEventListener('submit', async (e) => {
    e.preventDefault(); // cancela el evento
    try {
      const email = auth.currentUser.email;
      const name = auth.currentUser.displayName;
      await savePublic(inputPost.value, [], name, email, getTimestamp());
      const post = document.createElement('p');
      post.textContent = inputPost.value;
      feedSection.appendChild(post);
      inputContainer.reset();
    } catch (error) {
      // console.log(error);
    }
  });

  postButton.addEventListener('click', async () => {});

  // Botón para regresar a home
  homeIcon.addEventListener('click', () => onNavigate('/'));

  // Botón para regresar a welcome
  profileIcon.addEventListener('click', () => onNavigate('/welcome'));

  // Botón de cerrar sesión
  logOutIcon.addEventListener('click', async () => {
    await signOff();
    onNavigate('/');
  });

  // querySnapshot contiene todos los documentos de nuestra colección
  postData((querySnapshot) => {
    feedSection.innerHTML = '';
    querySnapshot.forEach((docum) => {
      // forEach recorre el array de los documentos
      const postSection = document.createElement('section');
      const halfpComment = document.createElement('div');
      const pComment = document.createElement('p');
      const halfBtns = document.createElement('div');
      const editBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');
      const divlike = document.createElement('div');
      const btnLike = document.createElement('button');
      const likePawZero = document.createElement('img');
      const likePaw = document.createElement('img');

      divlike.setAttribute('id', 'divlike');
      divlike.innerHTML = `${docum.data().likes.length}`;

      postSection.setAttribute('id', 'postSection');
      halfpComment.setAttribute('id', 'halfpComment');
      pComment.setAttribute('id', 'pComment');
      halfBtns.setAttribute('id', 'halfBtns');
      editBtn.setAttribute('id', 'editBtn');
      deleteBtn.setAttribute('id', 'deleteBtn');

      btnLike.setAttribute('id', 'btnLike');

      likePawZero.setAttribute('id', 'likePawZero');
      likePawZero.src = likeIcon;
      likePawZero.setAttribute('alt', 'likePawZero');

      likePaw.setAttribute('id', 'likePaw');
      likePaw.src = likedIcon;
      likePaw.setAttribute('alt', 'likePaw');
      likePaw.style.display = 'none';

      pComment.textContent = `${docum.data().name}: ${docum.data().publicacion}`;
      postSection.appendChild(pComment);

      editBtn.innerHTML = '<h4><b>Editar</b></h4>';
      deleteBtn.innerHTML = '<h4><b>Eliminar</b></h4>';
      halfpComment.appendChild(pComment);
      halfBtns.appendChild(editBtn);
      halfBtns.appendChild(deleteBtn);
      halfBtns.appendChild(btnLike);
      btnLike.appendChild(likePaw);
      btnLike.appendChild(likePawZero);
      halfBtns.appendChild(divlike);
      postSection.appendChild(halfpComment);
      postSection.appendChild(halfBtns);
      feedSection.appendChild(postSection);

      // estilo de los garritas para que cambien de color
      // si da like reconoce al usuario y no da más likes
      if (docum.data().likes.includes(auth.currentUser.uid)) {
        likePawZero.style.display = 'none';
        likePaw.style.display = 'flex';
      } else {
        likePaw.style.display = 'none';
        likePawZero.style.display = 'flex';
      }
      // Boton de like y dislike
      btnLike.addEventListener('click', () => {
        console.log(auth.currentUser.email);
        const user = auth.currentUser.uid;
        const likes = docum.data().likes;
        console.log(auth.currentUser.uid);
        // si el usuario da like los suma
        if (!likes.includes(user)) {
          like(docum, auth);
        } else {
          // dislike resta el me gusta
          dislike(docum, auth);
        }
      });

      // creasmos un modal para confirmar si desea eliminar la publicacion
      const dialog = document.createElement('dialog');
      const dialogTitle = document.createElement('h3');
      const dialogMessage = document.createElement('p');
      const confirmButton = document.createElement('button');
      const cancelButton = document.createElement('button');

      dialog.setAttribute('id', 'modal');
      confirmButton.setAttribute('id', 'confirmButton');
      cancelButton.setAttribute('id', 'cancelButton');
      dialogTitle.textContent = 'Eliminar publicación';
      dialogMessage.textContent = '¿Estás seguro que deseas eliminar esta publicación?';
      confirmButton.innerHTML = '<b>Eliminar</b>';
      cancelButton.innerHTML = '<b>Cancelar</b>';

      dialog.appendChild(dialogTitle);
      dialog.appendChild(dialogMessage);
      dialog.appendChild(confirmButton);
      dialog.appendChild(cancelButton);

      // para cuando se de en eliminar aparezca en modal con las opciones
      if (auth.currentUser.email === docum.data().email) {
        deleteBtn.addEventListener('click', () => {
          document.body.appendChild(dialog);
          dialog.showModal();
        });

        // elimina publicación
        confirmButton.addEventListener('click', () => {
          deletePost(docum.id)
            .then(() => {
              dialog.close();
            });
        });

        // cancela publicación que se quiere eliminar
        cancelButton.addEventListener('click', () => {
          dialog.close();
        });

        // editar publicaiones
        editBtn.addEventListener('click', () => {
          const editPub = document.createElement('input');
          editPub.setAttribute('id', 'editPub');
          editPub.value = docum.data().publicacion;
          pComment.replaceWith(editPub);

          const saveBtn = document.createElement('button');
          saveBtn.setAttribute('id', 'saveBtn');
          saveBtn.innerHTML = '<h4><b>Guardar</b></h4>';
          halfBtns.appendChild(saveBtn);

          // Guarda la publicacion que se edita
          saveBtn.addEventListener('click', () => {
            updatePost(docum.id, {
              publicacion: editPub.value,
            }).then(() => {
              alert('Documento actualizado con éxito');
              pComment.textContent = `${editPub.value}`;
              editPub.replaceWith(pComment);
              saveBtn.remove();
            })
              .catch((error) => {
                alert('Error al actualizar el documento', error);
              });
          });
        });
      }
    });
  });

  return bodyHTML;
};
