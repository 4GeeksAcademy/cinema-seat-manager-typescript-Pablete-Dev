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

const sala = inicializarSala();
mostrarSala(sala);

reservarAsiento(sala, 1, 1);
reservarAsiento(sala, 1, 1);
reservarAsiento(sala, 9, 1);
mostrarSala(sala);

const conteos = contarAsientos(sala);
console.log(`Asientos ocupados: ${conteos[0]}`);
console.log(`Asientos disponibles: ${conteos[1]}`);

buscarAsientosContiguos(sala);
