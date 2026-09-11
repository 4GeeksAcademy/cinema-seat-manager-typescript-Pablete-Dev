if (typeof document !== "undefined") {
  import("./style.css");
}

export function inicializarSala(): number[][] {
  const sala: number[][] = [];

  for (let fila = 0; fila < 8; fila++) {
    const asientos: number[] = [];

    for (let columna = 0; columna < 10; columna++) {
      asientos.push(0);
    }

    sala.push(asientos);
  }

  return sala;
}

export function mostrarSala(sala: number[][]): void {
  let encabezado = "   ";

  for (let columna = 0; columna < 10; columna++) {
    encabezado += `${columna + 1} `;
  }

  console.log(encabezado);

  for (let fila = 0; fila < sala.length; fila++) {
    let filaMostrada = `${fila + 1}  `;

    for (let columna = 0; columna < sala[fila].length; columna++) {
      filaMostrada += `${sala[fila][columna] === 0 ? "L" : "X"} `;
    }

    console.log(filaMostrada);
  }
}

export function reservarAsiento(
  sala: number[][],
  fila: number,
  columna: number,
): void {
  if (fila < 1 || fila > sala.length) {
    console.log("Error: la fila no existe.");
    return;
  }

  const indiceFila = fila - 1;
  const indiceColumna = columna - 1;

  if (columna < 1 || columna > sala[indiceFila].length) {
    console.log("Error: la columna no existe.");
    return;
  }

  if (sala[indiceFila][indiceColumna] === 1) {
    console.log("Error: el asiento ya esta ocupado.");
    return;
  }

  sala[indiceFila][indiceColumna] = 1;
  console.log("Asiento reservado correctamente.");
}

export function contarAsientos(sala: number[][]): number[] {
  let ocupados = 0;
  let disponibles = 0;

  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length; columna++) {
      if (sala[fila][columna] === 1) {
        ocupados++;
      } else {
        disponibles++;
      }
    }
  }

  return [ocupados, disponibles];
}

export function buscarAsientosContiguos(sala: number[][]): number[] {
  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length - 1; columna++) {
      if (sala[fila][columna] === 0 && sala[fila][columna + 1] === 0) {
        const resultado = [fila + 1, columna + 1, columna + 2];
        console.log(
          `Primer par libre: fila ${resultado[0]}, columnas ${resultado[1]} y ${resultado[2]}.`,
        );
        return resultado;
      }
    }
  }

  console.log("No hay dos asientos libres contiguos.");
  return [];
}

console.log("\n--- Prueba: sala vacia ---");
const salaVacia = inicializarSala();
const conteosSalaVacia = contarAsientos(salaVacia);
console.log(`Ocupados: ${conteosSalaVacia[0]}, disponibles: ${conteosSalaVacia[1]}`);
buscarAsientosContiguos(salaVacia);

console.log("\n--- Prueba: sala parcialmente ocupada ---");
const salaParcial = inicializarSala();
salaParcial[0][0] = 1;
salaParcial[1][4] = 1;
const conteosSalaParcial = contarAsientos(salaParcial);
console.log(`Ocupados: ${conteosSalaParcial[0]}, disponibles: ${conteosSalaParcial[1]}`);
buscarAsientosContiguos(salaParcial);

console.log("\n--- Prueba: asientos libres sueltos ---");
const salaSinPares = inicializarSala();
for (let fila = 1; fila <= salaSinPares.length; fila++) {
  for (let columna = 1; columna <= 10; columna += 2) {
    salaSinPares[fila - 1][columna - 1] = 1;
  }
}
const conteosSalaSinPares = contarAsientos(salaSinPares);
console.log(`Ocupados: ${conteosSalaSinPares[0]}, disponibles: ${conteosSalaSinPares[1]}`);
buscarAsientosContiguos(salaSinPares);

console.log("\n--- Prueba: sala completamente llena ---");
const salaLlena = inicializarSala();
for (let fila = 1; fila <= salaLlena.length; fila++) {
  for (let columna = 1; columna <= 10; columna++) {
    salaLlena[fila - 1][columna - 1] = 1;
  }
}
const conteosSalaLlena = contarAsientos(salaLlena);
console.log(`Ocupados: ${conteosSalaLlena[0]}, disponibles: ${conteosSalaLlena[1]}`);
buscarAsientosContiguos(salaLlena);

if (typeof document !== "undefined") {
  const salaInterfaz = inicializarSala();
  let filaSeleccionada = 0;
  let columnaSeleccionada = 0;
  let filaParejaSugerida = 0;
  let columnaParejaSugerida = 0;
  let indiceInicioBusqueda = 0;

function mostrarMensaje(texto: string, tipo: string): void {
  const mensaje = document.querySelector<HTMLParagraphElement>("#message");
  if (mensaje) {
    mensaje.textContent = texto;
    mensaje.className = `message ${tipo}`;
  }
}

function actualizarContadores(): void {
  const conteos = contarAsientos(salaInterfaz);
  const ocupados = document.querySelector<HTMLElement>("#occupied-count");
  const disponibles = document.querySelector<HTMLElement>("#available-count");

  if (ocupados) ocupados.textContent = `${conteos[0]}`;
  if (disponibles) disponibles.textContent = `${conteos[1]}`;
}

function renderizarSala(): void {
  const mapa = document.querySelector<HTMLDivElement>("#seat-map");
  if (!mapa) return;

  mapa.innerHTML = "";

  const esquina = document.createElement("span");
  esquina.className = "grid-corner";
  mapa.appendChild(esquina);

  for (let columna = 1; columna <= 10; columna++) {
    const encabezado = document.createElement("span");
    encabezado.className = "column-label";
    encabezado.textContent = `${columna}`;
    mapa.appendChild(encabezado);
  }

  for (let fila = 0; fila < salaInterfaz.length; fila++) {
    const etiqueta = document.createElement("span");
    etiqueta.className = "row-label";
    etiqueta.textContent = `${fila + 1}`;
    mapa.appendChild(etiqueta);

    for (let columna = 0; columna < salaInterfaz[fila].length; columna++) {
      const asiento = document.createElement("button");
      const estaOcupado = salaInterfaz[fila][columna] === 1;
      asiento.type = "button";
      asiento.className = estaOcupado ? "seat occupied" : "seat available";
      asiento.textContent = `${columna + 1}`;
      asiento.setAttribute("aria-label", `Fila ${fila + 1}, asiento ${columna + 1}`);
      asiento.disabled = estaOcupado;

      if (
        fila + 1 === filaParejaSugerida &&
        (columna + 1 === columnaParejaSugerida || columna + 1 === columnaParejaSugerida + 1)
      ) {
        asiento.className = "seat suggested";
      }

      if (fila === filaSeleccionada - 1 && columna === columnaSeleccionada - 1) {
        asiento.className = "seat selected";
      }

      asiento.addEventListener("click", () => {
        filaSeleccionada = fila + 1;
        columnaSeleccionada = columna + 1;
        const seleccion = document.querySelector<HTMLElement>("#selected-seat");
        const ayuda = document.querySelector<HTMLParagraphElement>("#selection-help");
        const reservar = document.querySelector<HTMLButtonElement>("#reserve-button");

        if (seleccion) seleccion.textContent = `Fila ${filaSeleccionada}, asiento ${columnaSeleccionada}`;
        if (ayuda) ayuda.textContent = "Confirma tu selección para reservarla.";
        if (reservar) reservar.disabled = false;
        mostrarMensaje("Asiento seleccionado. Confirma para reservar.", "info");
        renderizarSala();
      });

      mapa.appendChild(asiento);
    }
  }
}

function reservarSeleccion(): void {
  if (filaSeleccionada === 0 || columnaSeleccionada === 0) {
    mostrarMensaje("Selecciona un asiento libre primero.", "error");
    return;
  }

  const asientoAntesDeReservar = salaInterfaz[filaSeleccionada - 1][columnaSeleccionada - 1];
  const esParteDeLaPareja =
    filaSeleccionada === filaParejaSugerida &&
    (columnaSeleccionada === columnaParejaSugerida ||
      columnaSeleccionada === columnaParejaSugerida + 1);
  reservarAsiento(salaInterfaz, filaSeleccionada, columnaSeleccionada);

  if (asientoAntesDeReservar === 0) {
    mostrarMensaje(`Reserva confirmada: fila ${filaSeleccionada}, asiento ${columnaSeleccionada}.`, "success");
    filaSeleccionada = 0;
    columnaSeleccionada = 0;
    if (esParteDeLaPareja) {
      filaParejaSugerida = 0;
      columnaParejaSugerida = 0;
    }
    const seleccion = document.querySelector<HTMLElement>("#selected-seat");
    const ayuda = document.querySelector<HTMLParagraphElement>("#selection-help");
    const reservar = document.querySelector<HTMLButtonElement>("#reserve-button");
    if (seleccion) seleccion.textContent = "Ninguno";
    if (ayuda) ayuda.textContent = "Pulsa un asiento libre para seleccionarlo.";
    if (reservar) reservar.disabled = true;
    actualizarContadores();
    renderizarSala();
  } else {
    mostrarMensaje("Ese asiento ya está ocupado.", "error");
  }
}

function buscarPareja(): void {
  let pareja: number[] = [];
  let indiceActual = 0;

  for (let fila = 0; fila < salaInterfaz.length; fila++) {
    for (let columna = 0; columna < salaInterfaz[fila].length - 1; columna++) {
      if (indiceActual >= indiceInicioBusqueda && salaInterfaz[fila][columna] === 0 && salaInterfaz[fila][columna + 1] === 0) {
        pareja = [fila + 1, columna + 1, columna + 2];
        break;
      }
      indiceActual++;
    }
    if (pareja.length > 0) break;
  }

  if (pareja.length === 0) {
    filaParejaSugerida = 0;
    columnaParejaSugerida = 0;
    indiceInicioBusqueda = 0;
    mostrarMensaje("No hay dos asientos libres contiguos.", "error");
    renderizarSala();
    return;
  }

  filaParejaSugerida = pareja[0];
  columnaParejaSugerida = pareja[1];
  indiceInicioBusqueda = indiceActual + 1;
  mostrarMensaje(`Pareja disponible: fila ${pareja[0]}, asientos ${pareja[1]} y ${pareja[2]}.`, "success");
  renderizarSala();
}

  const botonReservar = document.querySelector<HTMLButtonElement>("#reserve-button");
  const botonBuscar = document.querySelector<HTMLButtonElement>("#search-button");

  if (botonReservar) botonReservar.addEventListener("click", reservarSeleccion);
  if (botonBuscar) botonBuscar.addEventListener("click", buscarPareja);

  renderizarSala();
  actualizarContadores();
}
