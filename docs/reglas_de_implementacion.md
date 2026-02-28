# Reglas de Implementación y Flujo de Trabajo

Para asegurar la calidad, el orden y el mantenimiento adecuado del código a lo largo de la implementación del *Challenge ForoHub*, el equipo ha acordado el siguiente flujo de trabajo estricto:

## Flujo de Trabajo (Workflow)

Cada nueva iteración de código o funcionalidad deberá seguir este ciclo de 5 pasos:

1. **Leer la Historia de Usuario (HU):**
   * Antes de codificar, se debe comprender el requerimiento dictado en el `BACKLOG.md`.
   * Identificar los criterios de aceptación y el checklist asociado.

2. **Implementar la HU:**
   * Escribir el código en la rama correspondiente asegurando la aplicación de buenas prácticas (SOLID, Clean Code).
   * Agregar comentarios pertinentes si la lógica es abstracta.
   * **Nota importante para migraciones:** Siempre detener el proyecto Spring antes de crear o modificar archivos `.sql` en `db/migration`.

3. **Probar el funcionamiento de lo implementado:**
   * Ejecutar la aplicación y validar el comportamiento del endpoint nuevo o modificado usando **Postman o Insomnia**.
   * Realizar pruebas con datos válidos (Happy Path) y datos inválidos o ausentes (Unhappy Path).
   * Comprobar las respuestas HTTP correctas (200, 201, 204, 400, 401, 403, 404).
   * Solo se avanza al siguiente paso si las pruebas son exitosas.

4. **Actualizar el Backlog:**
   * Una vez probado el código, marcar los ítems del checklist de finalización de la HU en el `BACKLOG.md` con un `[x]`.
   * Considerar la HU como Concluida.

5. **Realizar Commits Descriptivos (Conventional Commits):**
   * Integrar los cambios utilizando las normativas de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
   * Aplicar la estrategia de **3 commits por iteración**:
     * `feat(api): <descripción del cambio funcional>`
     * `docs: actualizar README y marcar avance del módulo`
     * `docs: actualizar BACKLOG completando la HU XX`
   * Ejemplos adicionales de formato:
     * `feat(security): implementar filtro JWT en SecurityFilter`
     * `fix: corregir validación de tópicos duplicados`
     * `refactor: extraer lógica de token a TokenService`
