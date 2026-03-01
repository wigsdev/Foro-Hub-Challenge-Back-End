<h1 align="center">ForoHub PWA - Desafío Alura LATAM</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Java-25.0.2-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java"/>
  <img src="https://img.shields.io/badge/Spring_Boot-4.0.3-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Aiven_MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="Aiven"/>
  <img src="https://img.shields.io/badge/Render-Docker-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render"/>
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
</p>

---

## 🚀 Sobre el Proyecto

ForoHub es una Progressive Web Application (PWA) construida como proyecto integral y final para el *Challenge Back-End* de Alura LATAM y Oracle Next Education. Consiste en una arquitectura **Cliente-Servidor (Stateless)** moderna que emula el funcionamiento de StackOverflow o un foro de aprendizaje colaborativo.

La plataforma está diseñada con una estricta separación de responsabilidades:
- **Backend (API REST):** Desarrollado en Java 25 y Spring Boot 4, ofrece seguridad robusta mediante cifrado Bcrypt, Spring Security y **JSON Web Tokens (JWT)**.
- **Frontend (SPA):** Desarrollado con React y Vite, presentando una Interfaz de Usuario (UI) con tema oscuro nativo, glassmorphism, interceptores Fetch E2E y ruteo protegido.

<br>

<div align="center">
    <h3>Pantalla de Autenticación</h3>
    <img src="./assets/login_page.png" width="800" alt="ForoHub Login Page">
</div>

<br>

## ⚙️ Arquitectura Multi-Cloud

Este proyecto está 100% alojado en la nube con un pipeline CI/CD activo.

*   **Persistencia (Aiven):** La Base de Datos Relacional MySQL 8 se encuentra orquestada en la nube, recibiendo inyecciones y migraciones de esquemas controladas automáticamente mediante *Flyway*.
*   **Contenedor API (Render):** El Backend de Spring Boot fue dockerizado (multi-stage file) y se ejecuta en un *Web Service* Linux. Interviene en todo el ruteo CORS y valida las peticiones.
*   **Cliente SPA (Vercel):** El Frontend en React está desplegado y servido globalmente con baja latencia mediante la red perimetral de Vercel.

## 🎯 Características Principales (Features)

El sistema cuenta con un abanico completo de funcionalidades CRUD con estado de sesiones:

- **Autenticación con JWT:** Generación de tokens seguros con expiración controlada por el backend tras validación de credenciales.
- **Rutas Protegidas:** Navegación restringida en el CLI con React Router, forzando a usuarios anónimos al Login y verificando persistencia de JWT en LocalStorage.
- **Foro Interactivo (CRUD):** Los usuarios autenticados pueden crear sus propias dudas y visualizar la lista de discusión de otros estudiantes actualizándose en Base de Datos de forma bidireccional E2E.
- **Prevención de Duplicados (Backend):** Implementación de validaciones Spring `@Valid` previendo creación tópicos idénticos (`titulo` y `mensaje`).

<br>

<div align="center" style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
    <div>
        <h3>Dashboard Interactivo</h3>
        <img src="./assets/dashboard_poblado.png" width="400" alt="ForoHub Dashboard Poblado">
    </div>
    <div>
        <h3>Formulario CRUD Dinámico</h3>
        <img src="./assets/nuevo_topico.png" width="400" alt="Creación de Tópico React">
    </div>
</div>

<br>

## 🛠️ Tecnologías y Dependencias

**Backend API (`/`):**
- Spring Web, Spring Data JPA, Spring Security.
- MySQL Connector J / Flyway Migration.
- JWT (Auth0 jsr310).
- Lombok y Spring Boot DevTools.
- Springdoc (Swagger UI OpenAPI).

**Frontend UI (`/forohub-frontend/`):**
- React Vite.
- React Router DOM (v6+).
- Lucide React (Icons).
- Vercel Rewrites Config JSON.
- Vanilla CSS Variables.

---

## 📡 Documentación OpenAPI (Swagger)

Toda la arquitectura de la API cuenta con auto-documentación mediante Swagger UI en producción, sirviendo interfaces graficas sobre los Controladores de Seguridad, Tópicos, Usuarios y Respuestas.

A través de esta documentación viva, es factible conocer el Payload JSON exacto que Spring Boot espera y los Códigos HTTP (`200 OK`, `201 CREATED`, `403 FORBIDDEN`) resultantes:

<div align="center">
    <img src="./assets/swagger_get.png" width="800" alt="Swagger Endpoints">
    <br><br>
    <img src="./assets/swagger_post.png" width="800" alt="Swagger Controllers">
</div>

---

<br>

> *Desafío de Autenticación, Bases de Datos, Java, Dockerizacion y APIs REST. Completado y documentado bajo control de versiones Git en **Marzo de 2026**. Alura Latam / ONE.*
