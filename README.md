# Cinema Seat Manager

Cinema Seat Manager es un proyecto sencillo en TypeScript para gestionar una sala de cine de 8 filas por 10 asientos. La lógica utiliza funciones, arreglos y ciclos simples, sin clases ni objetos para el reto.

## Funcionalidades implementadas

- Inicialización de una sala con todos los asientos libres.
- Visualización de filas, columnas y estados de los asientos.
- Reserva de asientos con validación de posición y disponibilidad.
- Conteo de asientos ocupados y disponibles.
- Búsqueda del primer par de asientos libres contiguos horizontalmente.
- Pruebas de sala vacía, parcialmente ocupada, sin pares contiguos y completamente llena.
- Interfaz web opcional para visualizar la sala, seleccionar y reservar asientos, consultar contadores y buscar parejas contiguas.

## Instalación

Instala las dependencias del proyecto:

```bash
npm install
```

## Ejecutar la interfaz web

Inicia el servidor de desarrollo con:

```bash
npm run start
```

Después abre [http://localhost:5173/](http://localhost:5173/) en el navegador.

La interfaz web es opcional; la lógica principal también puede ejecutarse desde la consola.

## Validar TypeScript

Comprueba que el código TypeScript no tenga errores:

```bash
npm run typecheck
```

## Ejecutar la versión de consola

Ejecuta las pruebas y visualizaciones de la lógica desde la terminal:

```bash
npm run console
```

## Estructura principal

- `src/main.ts`: funciones TypeScript y pruebas de consola.
- `src/style.css`: estilos de la interfaz web.
- `index.html`: estructura de la interfaz web.
