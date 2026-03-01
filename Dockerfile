# Etapa 1: Build
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
# Copiamos el pom.xml y descargamos dependencias
COPY pom.xml .
# Copiamos el código fuente
COPY src ./src
# Compilamos el proyecto binario, skipeando tests para agilizar el pipeline de Render
RUN mvn clean package -DskipTests

# Etapa 2: Run (Producción)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copiamos el JAR generado desde la etapa de Build
COPY --from=build /app/target/forohub-0.0.1-SNAPSHOT.jar app.jar

# Render asigna dinámicamente el puerto mediante la variable de entorno $PORT
# Spring Boot lee esta variable automáticamente, pero por si acaso la declaramos expuesta.
EXPOSE 8080

# Punto de entrada de la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
