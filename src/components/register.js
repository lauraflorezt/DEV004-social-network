/* eslint-disable no-alert */
import { authGoogle, registerWithEmail } from '../lib/authentication';
import { auth } from '../lib/firebaseConfig';
import { logo, googleAccess } from './img';

export const register = (onNavigate) => {
  //* Aqui estamos creando lo que va en HTML.
  const signInSection = document.createElement('section');
  const coverImg = document.createElement('img');
  const signInHeader = document.createElement('h1');
  const nameInput = document.createElement('input');
  const formRegister = document.createElement('form');
  const emailInput = document.createElement('input');
  const passwordLabel = document.createElement('label');
  const passwordInput = document.createElement('input');
  const SignInLabel = document.createElement('label');
  const SignInBtn = document.createElement('button');
  const BtnGoogle = document.createElement('img');
  const loginBtn = document.createElement('button');

  //* Estamos asignando atributos para todos los elementos creados.
  signInSection.setAttribute('id', 'signInSeccion');
  signInHeader.innerHTML = 'Crea una cuenta';

  coverImg.setAttribute('id', 'LogoPetropolis');
  coverImg.src = logo;
  coverImg.setAttribute('alt', 'LogoPetropolis');

  formRegister.setAttribute('id', 'form');

  nameInput.setAttribute('type', 'text');

  nameInput.setAttribute('id', 'name');
  nameInput.setAttribute('name', 'name');
  nameInput.setAttribute('placeholder', 'Escribe tu nombre');

  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('id', 'email');
  emailInput.setAttribute('name', 'email');
  emailInput.setAttribute('placeholder', 'mascota@petropolis.com');

  passwordLabel.setAttribute('id', 'password');
  passwordLabel.setAttribute('name', 'password');
  passwordLabel.innerHTML = 'Contraseña:';

  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('id', 'password');
  passwordInput.setAttribute('name', 'password');

  SignInBtn.setAttribute('id', 'SignInBtn');
  SignInBtn.textContent = 'Registrarse';

  SignInLabel.setAttribute('id', 'SignInLabel');
  SignInLabel.setAttribute('name', 'SignInLabel');
  SignInLabel.innerHTML = '¿Ya tienes cuenta?';

  loginBtn.setAttribute('id', 'loginBtn');
  loginBtn.textContent = 'Iniciar Sesión';

  BtnGoogle.setAttribute('id', 'BtnGoogle');
  BtnGoogle.src = googleAccess;
  BtnGoogle.setAttribute('alt', 'BtnGoogle');

  //* Aqui estamos agregando todo a la sección de signInSection
  signInSection.appendChild(signInHeader);
  signInSection.appendChild(coverImg);
  formRegister.appendChild(nameInput);
  formRegister.appendChild(emailInput);
  formRegister.appendChild(passwordLabel);
  formRegister.appendChild(passwordInput);
  formRegister.appendChild(SignInBtn);
  formRegister.appendChild(SignInLabel);
  formRegister.appendChild(loginBtn);
  formRegister.appendChild(BtnGoogle);
  signInSection.appendChild(formRegister);

  loginBtn.addEventListener('click', () => onNavigate('/login'));

  formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const name = nameInput.value;
    const userInfo = {
      email,
      name,
      password,
    };

    // console.log(email, password);
    if (email === '' || name === '' || password === '') {
      alert('Ingrese todos los campos');
      return;
    }
    try {
      registerWithEmail(
        userInfo.email,
        userInfo.password,
        userInfo.name,
      );
      localStorage.setItem('name', name);
      onNavigate('/welcome');
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        alert('Error en contraseña');
      } else if (error.code === 'auth/email-already-in-use') {
        alert('El correo ya está registrado');
      }
    }
  });

  // Boton para ingresar con Google
  BtnGoogle.addEventListener('click', async () => {
    try {
      await authGoogle();
      onNavigate('/welcome');
      const user = auth.currentUser;
      const name = user.displayName;
      localStorage.setItem('name', name);
    } catch (error) {
      alert('Google error');
    }
  });

  return signInSection;
};
