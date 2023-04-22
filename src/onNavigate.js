import { home } from './components/home.js';
import { login } from './components/login.js';
import { register } from './components/register.js';
import { welcome } from './components/welcome.js';
import { timeline } from './components/timeline.js';

const root = document.getElementById('root');

// inicializamos el router
const routes = {
  '/': home,
  '/login': login,
  '/register': register,
  '/welcome': welcome,
  '/timeline': timeline,
};
const onNavigate = (pathname, paramRoutes = routes) => {
  // modifica la URL del navegador sin recargar la página
  window.history.pushState({}, pathname, window.location.origin + pathname);
  return root.replaceChildren(paramRoutes[pathname](onNavigate));
};

// evento que produce cambios en el historial de navegación
window.onpopstate = () => {
  root.innerHTML = '';
  // window.location.pathname Actualizar la ruta de acceso de la URL actual
  const component = routes[window.location.pathname];
  root.appendChild(component(onNavigate));
};

// evento que se dispara cuando se ha cargado completamente una página web
window.onload = () => {
  const component = routes[window.location.pathname];
  root.appendChild(component(onNavigate));
};
