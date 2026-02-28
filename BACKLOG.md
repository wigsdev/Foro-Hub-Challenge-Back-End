# Backlog del Proyecto: Challenge ForoHub

Este documento registra las Historias de Usuario (HUs) del Challenge ForoHub,
proporcionadas módulo a módulo para el desarrollo de una API REST con Spring Boot 3.

---

## HU 00: Crear el repositorio de tu proyecto en GitHub

**Etiquetas:** `Git/GitHub`

### Descripción
Git y GitHub son herramientas muy útiles para cualquier desarrollador, así que debes acostumbrarte a trabajar con ellas.

En este desafío queremos proponer que el primer paso a dar sea la creación de este repositorio en GitHub. Aunque aún no hayas desarrollado ningún código, lo importante es que tengas al menos una carpeta específica para tu proyecto, y puedas actualizarlo gradualmente.

Utilicemos nuestro README para detallar las funcionalidades de nuestro sistema, capturas de pantalla e incluso un vídeo de tu aplicación funcionando. De esta manera podrás mostrar tu proyecto a la comunidad 😄

**Recursos de apoyo:**
- Git - Configurando Git por primera vez
- Git y GitHub: Herramientas Esenciales para el Control de Versiones y Colaboración
- Cómo subir mi proyecto en GitHub
- Iniciando un repositorio con Git | Alura
- Creando un repositorio remoto en GitHub | Alura
- Clonando un repositorio con Git y GitHub | Alura
- Git: Los nuevos comandos git restore y git switch | Alura

---

### Checklist de finalización
- [x] Crear el repositorio en GitHub (público).
- [x] Hacer el primer commit con la estructura inicial del proyecto.
- [x] Redactar el `README.md` con las funcionalidades del sistema.

---

## HU 01: Configurando el entorno Java y Spring

**Etiquetas:** `Java`, `Configuración de entorno`, `Spring`

### Descripción
En esta primera fase, nos sumergiremos en la configuración del entorno de desarrollo Java para nuestro desafío de construir el ForoHub.

### Requisitos del entorno
Asegúrate de tener los siguientes programas, archivos y versiones:
- **Java JDK:** versión 17 en adelante.
- **Maven:** versión 4 en adelante.
- **Spring Boot:** versión 3 en adelante.
- **MySQL:** versión 8 en adelante (o PostgreSQL como alternativa).
- **IDE:** IntelliJ IDEA (opcional) u otro de preferencia.

### Configuración del Proyecto (Spring Initializr)
- **Lenguaje:** Java (versión 17+)
- **Tipo de proyecto:** Maven (Initializr utiliza la versión 4)
- **Spring Boot:** versión 3+
- **Empaquetado:** JAR
- **Dependencias a incluir:**
  - `Lombok`
  - `Spring Web`
  - `Spring Boot DevTools`
  - `Spring Data JPA`
  - `Flyway Migration`
  - `MySQL Driver`
  - `Validation`
  - `Spring Security`

---

### Checklist de finalización
- [x] Validar variables de entorno de Java JDK (v17+).
- [x] Validar variables de entorno de Maven (v4+).
- [x] Instalar y configurar MySQL (v8+).
- [x] Generar el proyecto base desde Spring Initializr con todas las dependencias indicadas.
- [x] Importar el proyecto al IDE.
- [x] Verificar que el proyecto compila y levanta correctamente.

---

## HU 02: Diagrama Base de Datos

**Etiquetas:** `Base de Datos`

### Descripción
Necesitarás utilizar una base de datos para almacenar la información de la aplicación.

Para crear un tópico se necesitan las siguientes informaciones:
- `id`
- `titulo`
- `mensaje`
- `fecha de creación`
- `status` (estado del tópico)
- `autor`
- `curso`

**Observación:** El challenge se centra en los tópicos. El diagrama propuesto representa una base de datos más completa, pero **no es obligatorio implementar todas las tablas** — es suficiente centrarse en la tabla de tópicos. La modelización de la(s) tabla(s) queda a tu criterio.

**Herramientas sugeridas para el modelo físico:**
- MySQL Workbench
- Astah Software
- fabFORCE.net
- Lucidchart (`lucid.app`)

---

### Checklist de finalización
- [x] Diseñar el modelo de datos para la tabla `topicos` con los 7 campos requeridos.
- [x] Crear el diagrama ER de la base de datos (herramienta a elección).
- [x] Crear el script SQL o migración Flyway correspondiente.

---

## HU 03: Construcción de la base de datos

**Etiquetas:** `Base de Datos`, `Configuración de entorno`

### Descripción
Para integrar la base de datos al proyecto ForoHub es necesario seguir tres pasos:

**1. Instalación de MySQL**
- Descargar e instalar MySQL v8+.
- Es válido usar PostgreSQL si se tiene mayor familiaridad con él.

**2. Configuración en el proyecto**
Agregar las siguientes dependencias en el `pom.xml` (si no se incluyeron desde Spring Initializr):
- `Validation`
- `MySQL Driver`
- `Spring Data JPA`
- `Flyway Migration`

Además, configurar el `application.properties` con los datos de la BD: `url`, `username`, `password` y el driver correspondiente.

**3. Migración en el proyecto**
Las migraciones son archivos `.sql` con instrucciones DDL para construir las tablas de la aplicación.
- Usar anotaciones `@PostMapping` y `@Transactional` en el controlador para la persistencia de datos.
- **Importante:** Pausar/detener la ejecución del proyecto Spring antes de crear o modificar migraciones.
- Probar la aplicación en Insomnia o Postman.

---

### Checklist de finalización
- [x] Crear la base de datos en MySQL.
- [x] Configurar `application.properties` con las credenciales y driver.
- [x] Crear el primer archivo de migración Flyway (`V1__create-table-topicos.sql`).
- [x] Verificar que Flyway ejecuta la migración correctamente al iniciar el proyecto.

---

## HU 04: Registro de un nuevo tópico

**Etiquetas:** `API`, `CRUD`

### Descripción
La API debe contar con un endpoint para el registro de tópicos que acepte solicitudes `POST` hacia la URI `/topicos`.

Los datos del tópico (título, mensaje, autor y curso) deben ser enviados en el cuerpo de la solicitud en formato JSON con `@RequestBody`. Los datos deben ser persistidos en la base de datos usando el método `save` del `JpaRepository`.

**Sugerencia:** Usar la anotación `@Valid` para la validación de los datos de entrada.

### Reglas de negocio
- Todos los campos son obligatorios.
- La API **no debe permitir el registro de tópicos duplicados** (mismo título y mensaje).

---

### Checklist de finalización
- [x] Crear la entidad `Topico` con los campos requeridos y anotaciones JPA.
- [x] Crear el repositorio `TopicoRepository` extendiendo `JpaRepository`.
- [x] Crear el controlador `TopicoController` con el método `@PostMapping`.
- [x] Implementar validación de campos obligatorios con `@Valid` y `@NotBlank`.
- [x] Implementar la regla de unicidad (no duplicados por título y mensaje).
- [ ] Probar el endpoint con Insomnia o Postman.

---

## HU 05: Mostrar todos los tópicos

**Etiquetas:** `API`, `CRUD`

### Descripción
La API debe contar con un endpoint para el listado de todos los tópicos que acepte solicitudes `GET` hacia la URI `/topicos`.

Los datos (título, mensaje, fecha de creación, estado, autor y curso) deben ser devueltos en el cuerpo de la respuesta en formato JSON, usando el método `findAll` del `JpaRepository`.

**Funcionalidades opcionales:**
- Mostrar los primeros 10 resultados ordenados por fecha de creación (ASC).
- Filtrar resultados por nombre de curso y/o año específico.
- Implementar paginación usando la anotación `@PageableDefault`.

---

### Checklist de finalización
- [x] Crear el método `@GetMapping` en `TopicoController` para `/topicos`.
- [x] Retornar la lista de tópicos como DTO con los 6 campos solicitados.
- [x] (Opcional) Implementar paginación con `@PageableDefault` ordenada por fecha.
- [x] (Opcional) Implementar filtros por curso y año.
- [ ] Probar el endpoint con Insomnia o Postman.

---

## HU 06: Detallando un tópico

**Etiquetas:** `API`, `CRUD`

### Descripción
La API debe contar con un endpoint para el detalle individual de un tópico que acepte solicitudes `GET` hacia la URI `/topicos/{id}`.

Los datos del tópico (título, mensaje, fecha de creación, estado, autor y curso) deben ser devueltos en el cuerpo de la respuesta en formato JSON. Usar la anotación `@PathVariable` para recibir el ID desde la URL.

### Reglas de negocio
- El campo `id` es obligatorio para la consulta.
- Verificar que el ID proporcionado exista en la base de datos.

---

### Checklist de finalización
- [x] Crear método `@GetMapping("/{id}")` en `TopicoController`.
- [x] Usar `@PathVariable` para recibir el ID.
- [x] Retornar los datos del tópico como DTO si el ID existe.
- [x] Manejar el caso en que el ID no exista (respuesta adecuada al cliente).
- [ ] Probar el endpoint con Insomnia o Postman.

---

## HU 07: Actualizar un tópico

**Etiquetas:** `API`, `CRUD`

### Descripción
La API debe contar con un endpoint para la actualización de un tópico específico que acepte solicitudes `PUT` hacia la URI `/topicos/{id}`.

Usar `@PathVariable` para recibir el ID y verificar su existencia con `Optional.isPresent()` antes de persistir los cambios.

**Observación:** Las mismas reglas de negocio del registro de tópicos aplican también en la actualización (campos obligatorios, no duplicados).

---

### Checklist de finalización
- [ ] Crear método `@PutMapping("/{id}")` en `TopicoController`.
- [ ] Usar `@PathVariable` para recibir el ID.
- [ ] Verificar existencia del tópico con `Optional.isPresent()`.
- [ ] Aplicar las mismas reglas de negocio del registro (unicidad, campos obligatorios).
- [ ] Probar el endpoint con Insomnia o Postman.

---

## HU 08: Eliminar un tópico

**Etiquetas:** `API`, `CRUD`

### Descripción
La API debe contar con un endpoint para la eliminación de un tópico específico que acepte solicitudes `DELETE` hacia la URI `/topicos/{id}`.

Usar `@PathVariable` para recibir el ID. Verificar que el tópico exista antes de proceder. Usar el método `deleteById` del `JpaRepository` para realizar la eliminación física del registro.

---

### Checklist de finalización
- [x] Crear método `@DeleteMapping("/{id}")` en `TopicoController`.
- [x] Verificar existencia del tópico con `Optional.isPresent()`.
- [x] Ejecutar `deleteById` si el ID existe.
- [x] Retornar respuesta `204 No Content` al cliente.
- [ ] Probar el endpoint con Insomnia o Postman.

---

## HU 09: Pruebas a la API

**Etiquetas:** `Pruebas`, `API`, `CRUD`

### Descripción
Las pruebas de las funcionalidades de la API pueden realizarse utilizando alguna herramienta de pruebas de API como Postman o Insomnia.

**Herramientas:**
- **Postman:** https://www.postman.com
- **Insomnia:** https://insomnia.rest

---

### Checklist de finalización
- [x] Instalar y configurar Postman o Insomnia.
- [x] Probar el endpoint `POST /topicos` (creación).
- [x] Probar el endpoint `GET /topicos` (listado).
- [x] Probar el endpoint `GET /topicos/{id}` (detalle).
- [x] Probar el endpoint `PUT /topicos/{id}` (actualización).
- [x] Probar el endpoint `DELETE /topicos/{id}` (eliminación).
- [x] Verificar respuestas de error ante datos inválidos o IDs inexistentes.

---

## HU 10: Actualiza tu repositorio de proyecto en GitHub

**Etiquetas:** `Git/GitHub`

### Descripción
Ahora que has desarrollado todas las funcionalidades del ForoHub, es el momento de actualizar tu repositorio en GitHub con los últimos cambios. También recuerda actualizar el `README.md` para incluir las nuevas características de tu aplicación.

---

### Checklist de finalización
- [x] Asegurarse que todos los *commits* están subidos al repositorio remoto (`git push`).
- [x] Comprobar que el repositorio sea público.
- [x] Actualizar el `README.md` con las funcionalidades finales implementadas. *(Completado en HU 14)*

---

## HU 11: Autenticación con Spring Security

**Etiquetas:** `Base de Datos`, `Seguridad`, `API`

### Descripción
A partir de esta etapa, solo los usuarios autenticados pueden interactuar con la API. Se debe implementar un mecanismo de autenticación completo.

**1. Configuración de seguridad**
Crear la clase `SecurityConfigurations` con las anotaciones `@Configuration` y `@EnableWebSecurity`. Usar `HttpSecurity` de Spring para controlar el acceso a los endpoints.

**2. Autenticación en Java**
Implementar un `AuthenticationController` con `@RestController` y `@RequestMapping` para recibir solicitudes de login.
- Crear un DTO/Record para los datos de login y contraseña.
- Usar `AuthenticationManager` (de `SecurityConfigurations`) para autenticar al usuario.
- Anotar el método con `@PostMapping`, `@RequestBody` y `@Valid`.

**3. Base de Datos**
Crear una nueva tabla de usuarios para almacenar credenciales (login y contraseña hasheada). Crear/modificar la migración Flyway correspondiente.

> ⚠️ **Recordatorio:** Siempre detener el proyecto Spring antes de modificar migraciones.

---

### Checklist de finalización
- [x] Agregar/verificar la dependencia `Spring Security` en `pom.xml`.
- [x] Crear clase `SecurityConfigurations` con `@EnableWebSecurity`.
- [x] Crear entidad `Usuario` que implemente `UserDetails`.
- [x] Crear `UsuarioRepository` con método de búsqueda por login.
- [x] Crear migración Flyway para la tabla `usuarios`.
- [x] Crear `AuthenticationController` con endpoint `POST /login`.
- [x] Validar autenticación vía `AuthenticationManager`.
- [ ] Probar el flujo de login con Insomnia o Postman.

---

## HU 12: Generar un token con JWT

**Etiquetas:** `Seguridad`, `JWT`

### Descripción
Para agregar mayor seguridad a la API, se requieren tokens JWT para autenticación. El JWT (JSON Web Token) permite compartir información de forma segura entre cliente y servidor.

**Dependencia requerida:** Agregar la biblioteca de Auth0 (java-jwt) al `pom.xml`.

**Flujo de implementación:**
1. Crear la clase de servicio `TokenService` para aislar la generación y validación del token.
2. Implementar el método `generarToken()` usando el algoritmo HMAC256 con una clave secreta.
3. Configurar la fecha de expiración del token.
4. Inyectar `TokenService` en el `AuthenticationController` para retornar el token en la respuesta del login.

> Los valores `jwt.secret` y `jwt.expiration` deben definirse en `application.properties`.

---

### Checklist de finalización
- [x] Agregar la dependencia `java-jwt` de Auth0 al `pom.xml`.
- [x] Crear la clase `TokenService` anotada con `@Service`.
- [x] Implementar `generarToken(Usuario usuario)` con HMAC256.
- [x] Configurar `jwt.secret` y `jwt.expiration` en `application.properties`.
- [x] Inyectar `TokenService` en `AuthenticationController` y retornar el token en la respuesta.
- [ ] Probar que el endpoint `POST /login` devuelva un token JWT válido.

---

## HU 13: Autenticación con JWT (Control de Acceso)

**Etiquetas:** `Seguridad`, `JWT`

### Descripción
El token JWT generado en la etapa anterior debe ser utilizado para proteger todos los endpoints de la API. La API solo debe responder correctamente cuando el token enviado en la solicitud sea válido.

**Flujo de implementación:**
1. Crear un **Filter** o interceptor dedicado para validar el JWT en cada solicitud entrante.
2. Mapear las URLs en `SecurityConfigurations` indicando cuáles requieren autenticación.
3. Manejar adecuadamente los errores y estados HTTP (401 Unauthorized, 403 Forbidden).

> Verificar enviando el token como `Bearer Token` en el header `Authorization` de cada solicitud.

---

### Checklist de finalización
- [x] Crear clase `SecurityFilter` extendiendo `OncePerRequestFilter`.
- [x] Implementar el método `getTokenFromHeader()` para extraer el JWT del header.
- [x] Implementar el método `getSubject(token)` en `TokenService` para validar y parsear el token.
- [x] Configurar `SecurityConfigurations` para registrar el filtro antes de `UsernamePasswordAuthenticationFilter`.
- [x] Proteger todos los endpoints excepto `POST /login`.
- [x] Manejar excepciones con respuestas HTTP apropiadas (401/403).
- [x] Probar el flujo completo: login → obtener token → usar token en solicitudes protegidas.

---

## HU 14: Haz un README

**Etiquetas:** `Git/GitHub`, `README`

### Descripción
Uno de los pasos más importantes al participar en un proceso de selección es resolver un desafío propuesto por la empresa, y esto debe estar descrito en el README.

El `README.md` es un documento con la descripción del proyecto y sus instrucciones de uso. Debe estar redactado de forma clara, profesional y visualmente atractiva.

---

### Checklist de finalización
- [x] Redactar descripción del proyecto y sus funcionalidades.
- [x] Documentar los endpoints de la API (método, URL, descripción).
- [x] Incluir instrucciones para configurar y ejecutar el proyecto localmente.
- [x] (Opcional) Añadir capturas de pantalla o GIFs del proyecto en funcionamiento.

---

## HU 15: Terminar el Curso

**Etiquetas:** `Envio del enlace`

### Descripción
Ahora que tu proyecto ya está listo, recuerda enviar el enlace del repositorio en GitHub al curso del challenge y descargar tu certificado.

**Enlace de entrega:**
https://app.aluracursos.com/course/spring-framework-challenge-foro-hub/task/87075

---

### Checklist de finalización
- [x] Asegurarse que todos los *commits* están subidos al repositorio remoto (`git push`).
- [x] Comprobar que el repositorio sea público.
- [x] Ingresar al enlace de entrega.
- [x] Pegar el link del repositorio GitHub.
- [x] ¡Descargar tu certificado de conclusión! 🎉

---

## HU 16: Implementa otras rutas en tu aplicación *(Opcional)*

**Etiquetas:** `API`, `CRUD`, `Opcional`

### Descripción
Para que el foro esté completo, se pueden implementar endpoints adicionales que permitan crear, listar, actualizar y eliminar otros recursos más allá de los tópicos:

- `/usuarios` — CRUD de usuarios del foro.
- `/respuestas` — CRUD de respuestas asociadas a cada tópico.

---

### Checklist de finalización
- [ ] (Opcional) Implementar CRUD completo para `/usuarios`.
- [ ] (Opcional) Implementar CRUD completo para `/respuestas`.
- [ ] (Opcional) Proteger los nuevos endpoints con autenticación JWT.

---

## HU 17: Documentación con Swagger *(Opcional)*

**Etiquetas:** `Documentación`, `API`, `Opcional`

### Descripción
Documentar la API con **SpringDoc OpenAPI** (sucesor de SpringFox Swagger). Esta herramienta genera automáticamente una interfaz gráfica e interactiva (`/swagger-ui.html`) a partir del código, permitiendo explorar y probar los endpoints directamente desde el navegador.

Además de incorporar la dependencia correspondiente en el `pom.xml`, tambien se debe habilitar el acceso a la ruta de Swagger en `SecurityConfigurations` (sin requerir autenticación).

---

### Checklist de finalización
- [ ] Agregar la dependencia `springdoc-openapi-starter-webmvc-ui` al `pom.xml`.
- [ ] Permitir el acceso público a `/swagger-ui.html` y `/v3/api-docs` en la configuración de seguridad.
- [ ] Verificar que la documentación se genera correctamente al iniciar el proyecto.
