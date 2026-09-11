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
