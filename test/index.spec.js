import { home } from '../src/components/home';
import { register } from '../src/components/register';
import {
  registerWithEmail, signOff, authGoogle, signInWithPassword,
} from '../src/lib/authentication';
import { login } from '../src/components/login';
import { welcome } from '../src/components/welcome';
import { timeline } from '../src/components/timeline';
import { savePublic, postData } from '../src/lib/firestore';
import { auth } from '../src/lib/firebaseConfig';

// jest.mock es una función de Jest que se utiliza para "falsificar" ,
// "burlar" una dependencia de un módulo
jest.mock('../src/components/img.js');
jest.mock('firebase/auth');
jest.mock('../src/lib/authentication', () => ({
  signOff: jest.fn(),
  registerWithEmail: jest.fn(),
  signInWithPassword: jest.fn(),
  code: 'auth/wrong-password',
  authGoogle: jest.fn(),
}));
jest.mock('../src/lib/firestore.js');

describe('home', () => {
  it('se agregan los elementos HTML a la sección de inicio correctamente', async () => {
    // jest.fn devuelve una función simulada, que se configura para
    // que se comporte de manera determinada durante la prueba
    const onNavigate = jest.fn();
    const homeSection = home(onNavigate);
    // document.body.appendChild función que se utiliza para agregar
    // un elemento al final del cuerpo del documento HTML
    document.body.appendChild(homeSection);

    const welcomeHeader = homeSection.querySelector('h1');
    const loginButton = homeSection.querySelector('#loginButton');
    const signInButton = homeSection.querySelector('#signInButton');

    // aca afirmamos y comparamos
    expect(welcomeHeader.innerHTML).toBe('Bienvenido');
    expect(loginButton.textContent).toBe('Iniciar Sesión');
    expect(signInButton.textContent).toBe('Registrarse');
  });
  it('si el usuario llama al evento clic  manda llamar la funcion onNavigate con el parametro register', async () => {
    const onNavigate = jest.fn();
    const signInButton = document.createElement('button');

    home(onNavigate);
    // dispatchEvent envia un evento personalizado a un elemento HTML
    signInButton.dispatchEvent(new Event('click'));

    // ejecuta una función después de un cierto período de tiempo.
    setTimeout((done) => {
      expect(onNavigate).toHaveBeenCalledWith('/register');

      // done es una función que se utiliza para indicar que se ha completado una tarea asincrónica
      done();
    }, 0);
  });
  it('si el usuario llama al evento clic  manda llamar la funcion onNavigate con el parametro login', async () => {
    const onNavigate = jest.fn();
    const loginButton = document.createElement('button');

    home(onNavigate);
    loginButton.dispatchEvent(new Event('click'));

    setTimeout((done) => {
      expect(onNavigate).toHaveBeenCalledWith('/login');
      done();
    }, 0);
  });
});

describe('register', (done) => {
  it('se registra a un nuevo usuario', async () => {
    const onNavigate = jest.fn();
    const email = 'user@example.com';
    const password = 'password123';
    const UserCredentials = { user: { uid: '123' } };
    // mockResolvedValueOnce simula la respuesta exitosa de una función asíncrona
    registerWithEmail.mockResolvedValueOnce(UserCredentials);

    const form = document.createElement('form');
    const emailInput = document.createElement('input');
    emailInput.value = email;
    const passwordInput = document.createElement('input');
    passwordInput.value = password;
    form.appendChild(emailInput);
    form.appendChild(passwordInput);

    register(onNavigate);
    // form.dispatchEvent(new Event('submit'));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    // toHaveBeenCalledWith se utiliza para verificar,
    // si una función ha sido llamada con ciertos argumentos
    setTimeout(() => {
      expect(registerWithEmail).toHaveBeenCalledWith(email, password);
      expect(localStorage.setItem).toHaveBeenCalledWith('name', '');
      expect(onNavigate).toHaveBeenCalledWith('/welcome');
    }, 0);
  });

  it('si el usuario se registrò correctamente debe mandar llamar la funcion onNavigate con el parametro welcome', async () => {
    const onNavigate = jest.fn();
    const SignInBtn = document.createElement('button');

    register(onNavigate);
    SignInBtn.dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(onNavigate).toHaveBeenCalledWith('/welcome');
      done();
    }, 0);
  });

  it('si el usuario ya tiene cuenta  debe mandar llamar la funcion onNavigate con el parametro welcome', async () => {
    const onNavigate = jest.fn();
    const loginBtn = document.createElement('button');

    register(onNavigate);
    loginBtn.dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(onNavigate).toHaveBeenCalledWith('/login');
      done();
    }, 0);
  });

  it('devuelve un correo válido', async () => {
    try {
      const email = 'mariano@gmail.com';
      await authGoogle(email);
    } catch (error) {
      expect(error.message).toBe('Correo válido');
    }
  });
});

describe('login', (done) => {
  it('se registra a un nuevo usuario', async () => {
    const onNavigate = jest.fn();
    const email = 'user@example.com';
    const password = 'password123';

    const form = document.createElement('form');
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    form.appendChild(emailInput);
    form.appendChild(passwordInput);

    login(onNavigate);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    // toHaveBeenCalledWith se utiliza para verificar
    // si una función ha sido llamada con ciertos argumentos
    setTimeout(() => {
      expect(signInWithPassword).toHaveBeenCalledWith(email, password);
      expect(localStorage.setItem).toHaveBeenCalledWith('name', '');
      expect(onNavigate).toHaveBeenCalledWith('/welcome');
    }, 0);
  });

  it('si el usuario inicia sesión  correctamente debe mandar llamar la funcion onNavigate con el parametro welcome', async () => {
    const onNavigate = jest.fn();
    const loginBtn = document.createElement('button');

    login(onNavigate);
    loginBtn.dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(onNavigate).toHaveBeenCalledWith('/welcome');

      done();
    }, 0);
  });
  it('Enviar formulario de inicio de sesión con credenciales no válidas', async () => {
    // MocksSubmit login form with invalid credentials
    const onNavigate = jest.fn();
    const emailInput = document.createElement('input');
    emailInput.setAttribute('value', 'test@test.com');
    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('value', 'password');

    // Test
    const loginSection = login(onNavigate);
    loginSection.querySelector('#emailInput').replaceWith(emailInput);
    loginSection.querySelector('#password').replaceWith(passwordInput);
    loginSection.dispatchEvent(new Event('submit'));

    setTimeout(() => {
      expect(signInWithPassword).toHaveBeenCalledWith('test@test.com', 'password');
      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
      expect(alert).toHaveBeenCalledWith('Contraseña invalida');
      done();
    }, 0);
  });
  it('Enviar formulario de inicio de sesión con campos vacíos', async () => {
    // Mocks
    const onNavigate = jest.fn();
    const emailInput = document.createElement('input');
    const passwordInput = document.createElement('input');
    // Test
    const loginSection = login(onNavigate);
    loginSection.querySelector('#emailInput').replaceWith(emailInput);
    loginSection.querySelector('#password').replaceWith(passwordInput);
    loginSection.dispatchEvent(new Event('submit'));
    setTimeout(() => {
      expect(signInWithPassword).not.toHaveBeenCalled();
      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
      expect(alert).toHaveBeenCalledWith('Ingrese todos los campos');
      done();
    }, 0);
  });

  it('debería mostrar una alerta cuando el usuario ingresa una contraseña incorrecta', async () => {
    // Creamos un div que servirá como contenedor para el formulario generado por la función login
    const container = document.createElement('div');
    // Agregamos el formulario al contenedor
    container.appendChild(login());

    // Simulamos que el usuario envía el formulario
    // sin completar correctamente el campo de contraseña
    const form = container.querySelector('form');
    const emailInput = container.querySelector('#emailInput');
    const passwordInput = container.querySelector('#password');
    emailInput.value = 'correo_valido@example.com';
    passwordInput.value = 'contraseña_invalida';
    const submitEvent = new Event('submit');
    form.dispatchEvent(submitEvent);

    // Verificamos que se haya mostrado el alert correspondiente
    setTimeout(() => {
      expect(window.alert).toHaveBeenCalledWith('Contraseña invalida');

      done();
    }, 0);
  });

  it('El botón de Google se agrega correctamente', () => {
    // Crear un elemento de botón
    const button = document.createElement('button');
    button.textContent = 'Iniciar sesión con Google';

    // Agregar el botón al DOM
    document.body.appendChild(button);

    // Agregar el evento al botón
    button.addEventListener('click', async () => {
      try {
        await authGoogle();
        const onNavigate = jest.fn();
        const user = auth.currentUser;
        const name = user.displayName;
        localStorage.setItem('name', name);
        onNavigate('/welcome');
      } catch (error) {
        alert('Google error');
      }
    });

    // Comprobar que se ha llamado a la función authGoogle()
    expect(authGoogle).toHaveBeenCalled();
  });
});

describe('welcome', () => {
  it('se agregan los elementos HTML a la sección de inicio correctamente', async () => {
    // jest.fn devuelve una función simulada,
    //  que se configura para que se comporte de manera determinada durante la prueba
    const onNavigate = jest.fn();
    const welcomeSection = welcome(onNavigate);
    // document.body.appendChild función que se utiliza
    // para agregar un elemento al final del cuerpo del documento HTML
    document.body.appendChild(welcomeSection);

    const nextButton = welcomeSection.querySelector('#nextButton');

    // aca afirmamos y comparamos
    expect(nextButton.textContent).toBe('Continuar');
  });
});

describe('timeline', (done) => {
  it('se muestra la publicación', async () => {
    document.body.innerHTML = `
      <div id="feedSection"></div>
    `;
    await timeline(postData);

    setTimeout(() => {
      expect(postData).toHaveBeenCalled();
      // toContain verifica si un valor se encuentra en un array o en un string
      expect(document.getElementById('feedSection').innerHTML).toContain('Hello');
      done();
    }, 0);
  });

  it('Error en la funcion  savePublic', async () => {
    document.body.innerHTML = `
      <form id="inputContainer">
        <textarea id="inputPost"></textarea>
        <button id="postButton"></button>
      </form>
      <div id="feedSection"></div>
    `;

    // jest.spyOn crear un "spy" o "espía" de un objeto o función existente
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const postButton = document.getElementById('postButton');
    postButton.click();
    await Promise.resolve();

    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith(new Error('error'));

      done();
    }, 0);
    // mockRestore restaura una función "mockeada" a su estado original
    consoleSpy.mockRestore();
  });

  it('se llama a signOff ', async () => {
    document.body.innerHTML = `
      <footer id="footerHTML">
        <img id="logOutIcon">
      </footer>
    `;

    const logOutIcon = document.getElementById('logOutIcon');

    logOutIcon.click();
    await Promise.resolve();

    setTimeout(() => {
      expect(signOff).toHaveBeenCalled();

      done();
    }, 0);
  });
});

describe('savePublic', () => {
  test('Debe guardar la publicación', async () => {
    const mockSavePublic = savePublic.mockResolvedValueOnce();
    const post = 'Esto es un post';
    const name = 'Mariano';
    const email = 'mariano@example.com';
    const timestamp = Date.now();

    await savePublic(post, name, email, timestamp);

    expect(mockSavePublic).toHaveBeenCalledWith(post, name, email, timestamp);
  });
});
