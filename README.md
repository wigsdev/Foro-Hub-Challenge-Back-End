# ForoHub - Challenge Back End

## Historia

¡Bienvenido a **ForoHub**, el challenge de Back End de Alura!

Un foro es un lugar donde todos los participantes de una plataforma pueden colocar sus preguntas sobre determinados asuntos. En Alura, los estudiantes utilizan el foro para resolver sus dudas sobre los cursos y proyectos en los que están participando. Este lugar está lleno de aprendizaje y colaboración entre estudiantes, profesores y moderadores.

Ya sabemos para qué sirve el foro y cómo se ve, pero ¿sabemos cómo funciona por detrás? ¿Dónde se almacenan las informaciones? ¿Cómo se tratan esos datos para relacionar un tópico con una respuesta, o los usuarios con las respuestas de un tópico?

Ese es nuestro desafío: replicar a nivel de back end este proceso, y para eso crearemos una **API REST usando Spring**.

---

## Funcionalidades

Nuestra API se centra específicamente en los **tópicos**, y permite a los usuarios:

- ✅ Crear un nuevo tópico
- ✅ Mostrar todos los tópicos creados
- ✅ Mostrar un tópico específico
- ✅ Actualizar un tópico
- ✅ Eliminar un tópico

Es lo que conocemos como **CRUD** (Create, Read, Update, Delete).

Al finalizar el desarrollo, tendremos una API REST con las siguientes características:

- 🔗 **Rutas REST** implementadas siguiendo las mejores prácticas del modelo REST.
- ✔️ **Validaciones** realizadas según reglas de negocio.
- 🗄️ **Base de datos** para la persistencia de la información.
- 🔐 **Autenticación/Autorización** para restringir el acceso a la información.

---

## Tecnologías

- Java 17+
- Spring Boot 3
- Spring Security + JWT
- Spring Data JPA
- Flyway Migration
- MySQL 8+
- Lombok
- Bean Validation

---

## Cómo ejecutar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/forohub.git
   ```

2. Configurar las variables en `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/forohub
   spring.datasource.username=TU_USUARIO
   spring.datasource.password=TU_CONTRASEÑA
   api.security.secret=TU_SECRET_JWT
   ```

3. Ejecutar el proyecto desde el IDE o con Maven:
   ```bash
   ./mvnw spring-boot:run
   ```

4. La API estará disponible en `http://localhost:8080`.

---

## Endpoints principales

| Método | URI | Descripción |
|--------|-----|-------------|
| `POST` | `/login` | Autenticación (retorna token JWT) |
| `POST` | `/topicos` | Crear un nuevo tópico |
| `GET` | `/topicos` | Listar todos los tópicos |
| `GET` | `/topicos/{id}` | Obtener detalle de un tópico |
| `PUT` | `/topicos/{id}` | Actualizar un tópico |
| `DELETE` | `/topicos/{id}` | Eliminar un tópico |

> ⚠️ Para acceder a los endpoints (excepto `/login`), es necesario incluir el token JWT en el header: `Authorization: Bearer <token>`

### Pruebas de Seguridad (JWT en Acción)

**1. Petición rechazada sin Token (403 Forbidden):**
![GET /topicos Denied](https://raw.githubusercontent.com/wigsdev/Foro-Hub-Challenge-Back-End/main/img/403_forbidden.png)

**2. Petición aceptada con Bearer Token (200 OK):**
![GET /topicos Allowed](https://raw.githubusercontent.com/wigsdev/Foro-Hub-Challenge-Back-End/main/img/200_ok.png)

---

## 🏆 Entrega Final (Alura Challenges)
Proyecto desarrollado para el **Challenge ForoHub** de la formación *Java y Spring Framework* impartida por Alura Latam y Oracle Next Education (ONE). Todas las Historias de Usuario principales (HU 01 a HU 15) fueron implementadas exitosamente con control de versiones y persistencia de base de datos relacional.
