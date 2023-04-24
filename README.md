# Creando una Red Social

## Índice

* [1. Resumen del proyecto](#1-resumen-del-proyecto)
* [2. Objetivos de aprendizaje](#2-objetivos-de-aprendizaje)
* [3. Definición y objetivos del proyecto](#3-definición-y-objetivos-del-proyecto)
* [4. Historias de usuario](#4-historias-de-usuario)
* [5. Diseño de la interfaz de usuario](#5-diseño-de-la-interfaz-de-usuario)
* [6. Responsive](#6-responsive)

## 1. Resumen del proyecto

En este proyecto se ha desarrollado una red social centrada en las mascotas, que permite a los usuarios crear cuentas personalizadas y acceder a ella de manera fácil y rápida. Los usuarios pueden publicar información, y disfrutar de la interacción con otros amantes de las mascotas en línea (publicar y likear dichas publicaciones). La red social se construyó utilizando una Single-page Application (SPA) con varias vistas o páginas para una experiencia de usuario fluida y satisfactoria. Además, se utilizó Firebase como backend y Vite como herramienta de compilación para garantizar un rendimiento rápido y confiable. En general, este proyecto se ha creado para fomentar la comunidad de amantes de las mascotas y proporcionar una plataforma para la interacción y el intercambio de información.

<p align="center">
  <img src="https://user-images.githubusercontent.com/121992038/232165561-05731955-8a27-4fef-9559-491e7bfe4a18.png" alt="Petropolis" style="max-width:50%;">
</p>

### Los objetivos generales de este proyecto son los siguientes

* Desarrollar una SPA con temática de red social
* Aplicar los conceptos de responsividad en el desarrollo de las vistas (templates)
* Implementar un router para la navegación entre las diferentes vistas de la aplicación
* Emplear un servicio externo para la persistencia de datos de la aplicación
* Crear una suite de pruebas unitarias que permitan testear código asíncrono

## 2. Objetivos de aprendizaje

### HTML

- **Uso de HTML semántico**

### CSS

- **Uso de selectores de CSS**
- **Modelo de caja (box model): borde, margen, padding**
- **Uso de flexbox en CSS**
- **Uso de CSS Grid Layout**

### Web APIs

- **Uso de selectores del DOM**
- **Manejo de eventos del DOM (listeners, propagación, delegación)**
- **Manipulación dinámica del DOM**
- **Ruteado (History API, evento hashchange, window.location)**

### JavaScript

- **Arrays (arreglos)**
- **Objetos (key, value)**
- **Diferenciar entre tipos de datos primitivos y no primitivos**
- **Variables (declaración, asignación, ámbito)**
- **Uso de condicionales (if-else, switch, operador ternario, lógica booleana)**
- **Uso de bucles/ciclos (while, for, for..of)**
- **Funciones (params, args, return)**
- **Pruebas unitarias (unit tests)**
- **Pruebas asíncronas**
- **Uso de mocks y espías**
- **Módulos de ECMAScript (ES Modules)**
- **Uso de linter (ESLINT)**
- **Uso de identificadores descriptivos (Nomenclatura y Semántica)**
- **Diferenciar entre expresiones (expressions) y sentencias (statements)**
- **Callbacks**
- **Promesas**
### Control de Versiones (Git y GitHub)
- **Git: Instalación y configuración**
- **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**
- **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**
- **GitHub: Creación de cuenta y repos, configuración de llaves SSH**
- **GitHub: Despliegue con GitHub Pages**
- **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**
- **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**
### Centrado en el usuario
- **Diseñar y desarrollar un producto o servicio poniendo a las usuarias en el centro**
### Diseño de producto
- **Crear prototipos de alta fidelidad que incluyan interacciones**
- **Seguir los principios básicos de diseño visual**
### Investigación
- **Planear y ejecutar testeos de usabilidad de prototipos en distintos niveles de fidelidad**
### Firebase
- **Firebase Auth**
- **Firestore**

## 3. Definición y objetivos del proyecto📄

### 3.1 Encuesta📜💹

¿Qué tipo de  mascota tienes?
<p align="center">
  <img src="https://user-images.githubusercontent.com/121992038/232165677-9270ebad-68bc-43af-a225-495af7269393.JPG" style="max-width:50%;">
</p>

¿Te gustaría  conocer, y platicar con personas que también tengan mascotas como las tuyas? 
<p align="center">
  <img src="https://user-images.githubusercontent.com/121992038/232166157-d1a7e29e-3312-4a65-b6f0-ffa4e92a25f7.JPG" style="max-width:50%;">
</p>

¿Te gustaría leer y/o publicar Anécdotas o tip's de como cuidar a tus mascotas? 
<p align="center">
  <img src="https://user-images.githubusercontent.com/121992038/232165832-c69e8e0a-bcc4-46c4-a967-2831c1e88cca.JPG" style="max-width:50%;">
</p>

¿Que piensas de poder tener una galería disponible para subir y dar likes a fotos de tus mascotas?
<p align="center">
  <img src="https://user-images.githubusercontent.com/121992038/232165880-a37b9773-d984-4a5c-a483-8224909545a2.JPG" style="max-width:50%;">
</p>


### 3.2 Usuarios🤵

Los usuarios de esta red social son personas apasionadas por las mascotas y que desean compartir su amor y cuidado por sus amigos peludos con otros usuarios afines. Los usuarios pueden ser dueños de mascotas de cualquier tipo, desde perros y gatos hasta animales exóticos como reptiles o aves. La red social está abierta a usuarios de todas las edades y orígenes, esta pensada para aquellos que buscan conectarse con otros amantes de las mascotas y obtener información útil sobre el cuidado de sus mascotas. Además, esta red social esta diseñada recibir comentarios y reacciones positivas de otros usuarios que comparten su misma pasión. En resumen, cualquier persona que adore a los animales y desee conectarse con otros amantes de las mascotas es bienvenida en esta red social.

### 3.3 Objetivo del Producto (Problemas que resuelve)🚧🗺️🕵️‍♂️

El objetivo de nuestro producto es proporcionar a los dueños de mascotas una plataforma en línea para conectarse con otros dueños de mascotas en su área y compartir información útil sobre el cuidado de los animales. Además, nuestro producto tiene como objetivo ayudar a los dueños de mascotas a encontrar servicios de cuidado de mascotas confiables y de alta calidad en su área, mediante la creación de una red de amigos donde los dueños de mascotas puedan obtener recomendaciones de otros usuarios de confianza. Nuestro producto les permitirá a nuestros usuarios tener tranquilidad y asegurarse de que sus mascotas estén en buenas manos.

## 4. Historias de usuario👩‍🦱👩‍🦰

### HU1 Registro de cuenta
    Yo Cómo
    Dueño de una mascota
    Quiero
    Poder registrarme a una red social de mascotas y sus dueños de manera fácil y rápida
    Para
    Conocer e interactuar con nuevas personas que desean publicar algo de sus mascotas.

    **Criterio de Aceptación**
    1.1. El usuario debe poder visualizar los campos a diligenciar y que estos sean claros
    1.2. El usuario debe poder dar click en el botón de registro y que este lo lleve al formulario que debe diligenciar.
    1.3. El usuario debe poder encontrar una página inicial en donde haya un botón de registro.
    1.4 Que sea responsive

    **Definición de terminado**
    1.1. Que no marque error el codigo
    1.2. Pruebas de testeo
    1.3. Pruebas de usabilidad
    1.4. Fiel al prototipo
    1.5. Tener una cuenta y contraseña de registro para poder acceder a la red social (Petropolis).

### HU2. Acceso
    Yo Cómo
    Dueño de una mascota
    Quiero
    Iniciar sesión en la red social
    Para
    Conocer e interactuar con nuevas personas y ver sus publicaciones

    **Criterio de Aceptación**
    2.1.En la pantalla inicial donde se encuentra ubicadas las opciones registro debe estar incluido la opción de inicio de sesión
    2.2. Al darle click a la opción de inicio de sesión muestra una pantalla con los datos a diligenciar que seria correo y contraseña
    2.3. Encontrara un botón de iniciar sesión
    2.4 Acceder a través de google.
    2.5 Error de validación, o de contraseña incorrecta.
    2.6 Que sea Responsive

    **Definición de Terminado**
    2.1. Que no marque error el codigo
    2.2. Pruebas de testeo
    2.3. Pruebas de usabilidad
    2.4. Fiel al prototipo

### HU3. Moverse entre diferentes vistas.
    Yo Cómo
    Dueño de una mascota
    Quiero
    Moverme entre diferentes vistas
    Para
    Interactuar con la red social

    **Definición de Terminado**
    3.1 Que existan diferentes componentes para cada vista 
    3.2 Que no marque error el código

    **Criterios de Aceptación**
    3.1 El usuario debe poder navegar entre diferentes vistas de la pagina.

### HU4 Crear Post
    Yo Cómo
    Dueño de una mascota
    Quiero
    Escribir textos y publicarlos para interactuar con personas con mascotas como las mías.
    Para
    Poder leer Anécdotas o tip's de como cuidar a mi mascota

    **Criterios de Aceptación**
    4.1. Leer y/o publicar con otras personas
    4.2. Poder visualizar los comentarios publicados
    4.3. Ver mi historial
    4.4. Que sea responsive
    4.5. Debe haber un botón que al darle click publique el post en el muro.
    4.6. Siempre que haga una publicación nueva el cajón de texto debe pasar a blanco o vacío

    **Definición de terminado**
    4.1. Que no marque error el codigo
    4.2. Pruebas de testeo
    4.3. Pruebas de usabilidad
    4.4. Fiel al prototipo

### HU5 Editar Post
    Yo Cómo
    Dueño de una mascota
    Quiero
    Poder editar mi publicación
    Para
    Hacer la corrección que necesite de mi publicación

    **Criterios de Aceptación**
    5.1. El usuario debe encontrar en el post la opción de editar
    5.2. El usuario debe poder encontrar un botón que le permita guardar el cambio
    5.3. Se debe visualiza de manera inmediata el post editado

    **Definición de Terminado**
    5.1. Que no marque error el código
    5.2. Pruebas de testeo
    5.3. Pruebas de usabilidad
    5.4. Fiel al prototipo

### HU6. Eliminar Post
    Yo Cómo
    Dueño de una mascota
    Quiero
    Poder eliminar mis publicaciones que por error comente.
    Para
    No ver esos comentarios mas en mi muro.

    **Criterios de Aceptación**
    6.1. El usuario debe encontrar en el post la opción de Eliminar
    6.2. El usuario debe visualizar una alerta cuando se clickee la opción Eliminar
    6.3. El post debe desaparecer por completo.

    **Definición de Terminado**
    6.1. Que no marque error el código
    6.2. Pruebas de testeo
    6.3. Pruebas de usabilidad
    6.4. Fiel al prototipo

### HU7 Dar likes
    Yo Cómo
    Dueño de una mascota
    Quiero
    Interactuar mediante likes con otras publicaciones
    Para
    Demostrar si me gusta o no una publicación.

    **Criterios de Aceptación**
    7.1. Poder dar like a una publicación
    7.2. Que cambie de otro color el like cuando le des click
    7.3. Que sea responsive

    **Definición de terminado**
    7.1. Que no marque error el codigo
    7.2. Pruebas de testeo
    7.3. Pruebas de usabilidad
    7.4. Fiel al prototipo

### HU8. Eliminar likes
    Yo Cómo
    Dueño de una mascota
    Quiero
    Eliminar el like a otras publicaciones
    Para
    Mostrar que la publicación ya no es de mi agrado..

    **Criterios de Aceptación**
    8.1. Quitar  el like a una publicación
    8.2. Que cambie de otro color el like cuando se retire.
    8.3. Que sea responsive

    **Definición de Terminado**
    8.1. Que no marque error el codigo
    8.2. Pruebas de testeo
    8.3. Pruebas de usabilidad
    8.4. Fiel al prototipo

### HU9.Conteo de likes
    Yo Cómo
    Dueño de una mascota
    Quiero
    Poder ver el número de likes de mi publicación y de otras publicaciones
    Para
    Contar los likes que tiene mi publicación y los de otras personas.

    **Criterios de Aceptación**
    9.1. Poder visualizar un numero al lado del botón de like.
    9.2. Que sea responsive
    9.3. Que el número incremente o disminuya dependiendo del número de likes.

    **Definición de Terminado**
    9.1. Que no marque error el codigo
    9.2. Pruebas de testeo
    9.3. Pruebas de usabilidad
    9.4. Fiel al prototipo

### 5. Diseño de la interfaz de usuario🧍‍♂️

PROTOTIPO DE BAJA FIDELIDAD
En el proceso de desarrollo del proyecto, cada miembro del equipo comenzó a trabajar en la creación de un prototipo de baja fidelidad de forma individual. Esto nos permitió explorar diferentes opciones de diseño y de flujo de usuario. Una vez que cada miembro del equipo completó su prototipo, los compartimos y trabajamos juntas en la unión de ellos. Al unir los prototipos, pudimos combinar nuestras ideas y elegir las mejores opciones de cada uno. De esta manera, creamos un prototipo que incorporó las mejores prácticas de diseño y de usabilidad.

PROTOTIPO DE BAJA FIDELIDAD![PrototipoBajaF](https://user-images.githubusercontent.com/121992038/232166275-7a8df789-0d61-470d-bd9b-f99f132ba840.jpg)

PROTOTIPO DE ALTA FIDELIDAD
Para asegurarnos de que el flujo de nuestra página fuera coherente y fácil de seguir para los usuarios, utilizamos Figma para crear un prototipo de baja fidelidad. Este prototipo nos permitió visualizar cómo el usuario navegará por la página y cómo se conectarán las diferentes secciones. La creación del prototipo de alta fidelidad también nos permitió identificar posibles problemas de diseño y flujo, asegurándonos de que la página fuera óptima para nuestros usuarios.

<p align="center">
  <img src="https://user-images.githubusercontent.com/121992038/232166319-3a0cf999-ba29-4d92-a399-5cf62f114df1.jpg">
</p>
<br>
<p align="center">
  <a href="https://www.figma.com/proto/gzSRRNtQ0mg68hvu3T3Rko/Untitled?node-id=34-19&scaling=scale-down&page-id=0%3A1&starting-point-node-id=34%3A19">Link de Prototipo en Figma</a>
</p>

### 6. Responsive💻📱

Para asegurarnos de que nuestra página web sea accesible en dispositivos móviles, utilizamos la técnica Mobile First para el diseño. Al diseñar para dispositivos móviles primero, nos aseguramos de que la página sea fácil de usar en pantallas más pequeñas y que los elementos clave estén en el lugar correcto. Después de diseñar para dispositivos móviles, expandimos el diseño a tamaños de pantalla más grandes y ajustamos el diseño según fuera necesario para garantizar que la página sea completamente responsive en todas las plataformas.
<p align="center">
  <img src=".\src\Img\vistas.png">
</p>


### 5.1. Comportamiento de la interfaz de usuario (UI)👥🕺

✔️ **Creación de cuenta de usuario e inicio de sesión**
* _Login_ con Firebase:
   - Creación de cuenta de acceso y autenticación con cuenta de correo y
    contraseña, y también con una cuenta de Google.
* Validaciones:
  - Solamente se permite el acceso a usuarios con cuentas válidas.
  - No pueden haber usuarios repetidos.
  - La cuenta de usuario debe ser un correo electrónico válido.
  - Lo que se escriba en el campo (_input_) de contraseña debe ser secreto.
* Comportamiento:
  - Al enviarse el formulario de registro o inicio de sesión, debe validarse.
  - Si hay errores, se deben mostrar mensajes descriptivos para ayudar al
  usuario a corregirlos.

✔️ **Muro/timeline**
* Validaciones:
  - Al publicar, se debe validar que exista contenido en el _input_.
* Comportamiento:
  - Al recargar la aplicación, se debe verificar si el usuario está _logueado_
    antes de mostrar contenido.
  - Poder publicar un _post_.
  - Poder dar y quitar _like_ a una publicación. Máximo uno por usuario.
  - Llevar un conteo de los _likes_.
  - Poder eliminar un post específico.
  - Pedir confirmación antes de eliminar un _post_.
  - Al dar _click_ para editar un _post_, debe cambiar el texto por un _input_
    que permita editar el texto y luego guardar los cambios.
  - Al guardar los cambios debe cambiar de vuelta a un texto normal pero con la
    información editada.
  - Al recargar la página debo de poder ver los textos editados.
#### 5.2 Pruebas unitarias (unit tests)📈💹
<p align="center">
  <img src=".\src\Img\test.png">
</p>

### 5.3.Consideciones tecnicas UX👥🕺
✔️ **Hacer seciones de _testing de usabilidad_ con el producto en HTML.**
*Resuldos obtenidos:
-Mejora en el diseño de botones.
-Cambio de la paleta de colores .
<p align="center">
  <img src=".\src\Img\testUX.png">
</p>
## 6. Producto Final
<p align="center">
  <a href="https://petropolis-esperaanza.vercel.app/">Petropolis</a>
</p>
