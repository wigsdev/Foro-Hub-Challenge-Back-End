# Ciclo de Vida del Desarrollo de Software (SDLC) - ForoHub

El proceso que estamos siguiendo para el **Challenge ForoHub** se enmarca en un proceso estructurado del Ciclo de Vida del Desarrollo de Software (SDLC, por sus siglas en inglés) que consta de 7 fases clave.

Nuestra metodología se mapea de la siguiente manera:

## 1. Planificación
En esta fase inicial, extrajimos y comprendimos todos los requisitos brindados por Alura. Formateamos las Historias de Usuario, asignamos etiquetas, construimos el **Backlog del Proyecto** y definimos las metas a corto plazo (Sprints). Se seleccionaron las tecnologías base: Java 17+, Spring Boot 3, MySQL 8+, Spring Security, JWT y Maven.

## 2. Análisis
Se estudiaron los requisitos funcionales del foro: creación, listado, detalle, actualización y eliminación de tópicos. Se identificaron las reglas de negocio clave (campos obligatorios, unicidad de tópicos por título y mensaje) y se definió el modelo de datos centrado en la entidad `Topico`, con una entidad `Usuario` adicional para el control de autenticación.

## 3. Diseño
Se proyectó la arquitectura del sistema en capas:
* **Capa de Seguridad:** Spring Security con filtro JWT (`SecurityFilter`) y configuración centralizada (`SecurityConfigurations`).
* **Capa de Controladores:** Endpoints REST versionados con `@RestController` y `@RequestMapping`.
* **Capa de Servicio:** Lógica de negocio y generación/validación de tokens (`TokenService`).
* **Capa de Persistencia:** JPA Repositories con Flyway para migraciones controladas de la base de datos.

## 4. Desarrollo
Corresponde a la fase de programación. Es aquí donde satisfacemos cada una de las Historias de Usuario:
* Escribir entidades, DTOs y repositorios.
* Implementar el CRUD completo de tópicos.
* Configurar Spring Security y el mecanismo de autenticación JWT.
* Enlazar el sistema con MySQL y ejecutar las migraciones Flyway.

## 5. Pruebas (QA)
Parte íntegra obligatoria de nuestro flujo de trabajo. Cada endpoint pasará por pruebas manuales en Insomnia o Postman para confirmar que responde correctamente ante "Happy Paths" (datos válidos y token presente) y "Unhappy Paths" (token ausente, tópico duplicado, ID inexistente, campos vacíos).

## 6. Implementación (Despliegue)
Comprende la solidificación del proyecto para que pueda ser ejecutado por terceros (el equipo evaluador). Esto incluye armar el `README.md` pulido, garantizar la configuración del `application.properties`, empaquetar en GitHub y documentar las instrucciones necesarias para montar la base de datos local exigida.

## 7. Mantenimiento
Una vez el proyecto base esté construido y en fase Beta, esta etapa contemplará refinamientos basados en las misiones Extras/Opcionales:
* Implementar CRUD de `/usuarios` y `/respuestas`.
* Agregar documentación interactiva con Swagger (SpringDoc OpenAPI).
* Optimización de consultas JPA y corrección de posibles bugs no detectados.
