# Roles Utilizados en la Implementación

Dado el enfoque integral del **Challenge ForoHub** (desde el diseño de base de datos, la implementación de un CRUD REST completo hasta la configuración de seguridad con Spring Security y JWT), es necesario distribuir las capacidades requeridas en roles lógicos de desarrollo. Aunque sea un proyecto de esfuerzo individual o par, adoptaremos las siguientes posturas para asegurar la calidad del producto:

## 1. Backend Developer (Especialista en APIs REST)
* **Responsabilidades:**
  * Configurar Spring Boot y gestionar dependencias en Maven.
  * Diseñar y construir los controladores REST (`TopicoController`, `AuthenticationController`).
  * Crear los DTOs/Records para entrada y salida de datos.
  * Implementar la capa de servicio (`TokenService`) y conectar el flujo entre controlador y repositorio.

## 2. Database Administrator (DBA) / Arquitecto de Datos
* **Responsabilidades:**
  * Modelar la entidad `@Entity` de `Topico` y `Usuario` en Java, previendo su impacto físico en MySQL.
  * Diseñar y administrar las migraciones Flyway (`.sql`) en orden estricto de versiones.
  * Administrar relaciones entre entidades si se implementan `Respuesta` y `Curso`.
  * Diseñar y optimizar consultas personalizadas para los filtros opcionales (por nombre de curso y año).

## 3. Especialista en Seguridad (Security Engineer)
* **Responsabilidades:**
  * Configurar Spring Security (`SecurityConfigurations`) con gestión de sesiones sin estado (stateless).
  * Implementar el `SecurityFilter` extendiendo `OncePerRequestFilter` para validar el JWT en cada request.
  * Gestionar la generación y validación de tokens con HMAC256 en `TokenService`.
  * Garantizar que los endpoints protegidos devuelvan 401/403 correctamente ante tokens ausentes o inválidos.

## 4. Analista de Calidad (QA Tester)
* **Responsabilidades:**
  * Crear y ejecutar pruebas manuales exhaustivas en Insomnia o Postman.
  * Validar casos de borde: campos vacíos, tópicos duplicados, IDs inexistentes, tokens expirados o malformados.
  * Asegurar que por cada "Implementación" en el flujo de trabajo, se proceda a validar antes de aplicar el commit.

## 5. Product Owner / Technical Lead
* **Responsabilidades:**
  * Velar por la estructura técnica del proyecto y la coherencia de los documentos en `docs/`.
  * Mantener el `BACKLOG.md` debidamente actualizado con el progreso real.
  * Definir los criterios de aceptación y priorizar el desarrollo (Fase 1, 2, 3...).
  * Redactar documentación de alto nivel (el `README.md` final y los documentos en `docs/`).
