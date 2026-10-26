# Huellitas — rediseño visual

Se actualizó la presentación del frontend con una identidad visual rosa pastel, vainilla y crema, manteniendo la lógica existente de gestión de perritos.

## Ejecutar el proyecto

1. Instalar Node.js compatible con las versiones declaradas en `package.json`.
2. Desde esta carpeta ejecutar `npm ci`.
3. Ejecutar `npm run dev` y abrir la URL local que indique Vite.
4. Para comprobar tipos y generar el build de producción, ejecutar `npm run build`.

## Cambios principales

- Header con navegación a Inicio, Nuestros perritos y Gestión.
- Sección de bienvenida con llamada a explorar los perfiles.
- Tarjetas de mascotas con zoom suave en las imágenes, etiquetas, datos y controles de gestión.
- Buscador por nombre, raza y características, combinado con los filtros existentes.
- Modo claro/oscuro con preferencia guardada en el navegador.
- Formulario de alta/edición reorganizado visualmente.
- Vista de detalle para cada perrito.
- Footer emotivo y responsive.
- Integración del plugin oficial de Tailwind CSS para Vite y metadatos en español.

## Alcance

Los datos de ejemplo, el tipo `Perrito`, la validación del formulario y la consulta a Dog CEO para cambiar la raza/imagen se mantienen. La lista continúa usando el estado local del frontend, como en el proyecto original; este rediseño no añade persistencia ni modifica endpoints de una API propia.
