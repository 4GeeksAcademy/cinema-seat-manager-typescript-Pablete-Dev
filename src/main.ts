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
