// Este objeto se utiliza para almacenar
// las rutas y los manejadores de las páginas de la aplicación.
const ROUTES = {};

export const onNavigate = (pathname) => {
  const path = typeof ROUTES[pathname] !== 'function' ? pathname : '/';
  window.history.pushState({}, path, window.location.origin + pathname);
  const rootSection = document.getElementById('root');
  rootSection.innerHTML = '';
  rootSection.append(ROUTES[pathname]());
};

export const addRoutes = (routes) => {
  Object.keys(routes).reduce((currentRoutes, pathname) => {
    currentRoutes[pathname] = routes[pathname];
    return currentRoutes;
  }, ROUTES);
};

console.log('Hola mundo!');
