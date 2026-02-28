# Plan de Implementación (Challenge ForoHub)

Este documento detalla el plan estratégico para el desarrollo del "Challenge ForoHub", estructurado rigurosamente sobre la base de las Historias de Usuario (HU) definidas en nuestro Backlog.

## Fases de Implementación

### Fase 1: Inicialización y Configuración
* **HU 00:** Crear el repositorio en GitHub.
* **HU 01:** Configurar el entorno Java (v17+), Spring Boot 3 y las 8 dependencias requeridas.
* **HU 02:** Diseñar el diagrama de base de datos centrado en la tabla `topicos`.
* **HU 03:** Construir la base de datos en MySQL, configurar `application.properties` y ejecutar la primera migración Flyway.
* **Objetivo:** Tener el esqueleto del proyecto funcionando, conectado al repositorio remoto y con la base de datos MySQL lista para recibir conexiones.

### Fase 2: CRUD de Tópicos
* **HU 04:** Registrar un nuevo tópico (`POST /topicos`), con validaciones y control de duplicados.
* **HU 05:** Listar todos los tópicos (`GET /topicos`), con paginación opcional.
* **HU 06:** Detallar un tópico específico (`GET /topicos/{id}`).
* **HU 07:** Actualizar un tópico (`PUT /topicos/{id}`), respetando las reglas de negocio.
* **HU 08:** Eliminar un tópico (`DELETE /topicos/{id}`) con verificación de existencia.
* **Objetivo:** Tener el CRUD completo y funcional para la entidad `Topico`, con validaciones robustas y respuestas HTTP correctas.

### Fase 3: Pruebas de la API
* **HU 09:** Probar todos los endpoints con Insomnia o Postman.
* **Objetivo:** Validar el correcto funcionamiento del CRUD ante datos válidos e inválidos antes de añadir la capa de seguridad.

### Fase 4: Seguridad — Spring Security y JWT
* **HU 11:** Configurar Spring Security, crear la entidad `Usuario` y la migración de la tabla `usuarios`.
* **HU 12:** Crear `TokenService` para generar tokens JWT con HMAC256 y fecha de expiración.
* **HU 13:** Crear `SecurityFilter` para interceptar y validar el token en cada solicitud. Proteger todos los endpoints excepto `POST /login`.
* **Objetivo:** Que solo los usuarios autenticados puedan consumir los endpoints del CRUD de tópicos.

### Fase 5: Cierre y Entrega
* **HU 10 / HU 14:** Actualizar repositorio GitHub, redactar el `README.md` final con funcionalidades, instrucciones y tabla de endpoints.
* **HU 15:** Enviar el enlace del repositorio en el curso y descargar el certificado.
* **Objetivo:** Presentar un repositorio impecable y obtener la certificación.

### Fase 6: Extras (Opcionales)
* **HU 16:** Implementar CRUD para `/usuarios` y `/respuestas`.
* **HU 17:** Documentar la API con SpringDoc OpenAPI (Swagger UI).
* **Objetivo:** Elevar el nivel del producto con características avanzadas y una documentación visual e interactiva.
