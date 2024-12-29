export function calculateArtStudioSize(
  totalSize: number,
  cateringSize: number,
  percHalls: number,
): number {
  const leftOverSize = totalSize - cateringSize;
  return leftOverSize - leftOverSize * percHalls;
}

export function calculateCateringSize(
  minCatering = 0,
  totalSize = 0,
  percCatering = 0,
): number {
  return Math.max(minCatering, totalSize * percCatering);
}

export function receiveFullRowCalculation(
  totalSize: number,
  minCatering: number,
  percCatering: number,
  percHalls: number,
  percArtStudios: number,
) {
  const cateringSize = calculateCateringSize(
    minCatering,
    totalSize,
    percCatering,
  );
  const artStudioSize = calculateArtStudioSize(
    totalSize,
    cateringSize,
    percHalls,
  );
  const hallSize = totalSize - cateringSize - artStudioSize;
  return {
    artStudioSize,
    cateringSize,
    hallSize,
  };
}
