# Etapa 1: Build
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app
# Copiamos el pom.xml y descargamos dependencias
COPY pom.xml .
# Copiamos el código fuente, la envoltura de maven y su carpeta oculta
COPY src ./src
COPY mvnw .
COPY .mvn ./.mvn
# Permisos de ejecución para el wrapper y compilamos binario
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Etapa 2: Run (Producción)
FROM eclipse-temurin:25-jdk
WORKDIR /app
# Copiamos el JAR generado desde la etapa de Build
COPY --from=build /app/target/forohub-0.0.1-SNAPSHOT.jar app.jar

# Render asigna dinámicamente el puerto mediante la variable de entorno $PORT
# Spring Boot lee esta variable automáticamente, pero por si acaso la declaramos expuesta.
EXPOSE 8080

# Punto de entrada de la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
