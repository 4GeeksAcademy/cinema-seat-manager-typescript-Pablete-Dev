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

const sala = inicializarSala();
mostrarSala(sala);
