export function calculateArtStudioSize(
  totalSize: number,
  cateringSize: number,
  percHalls: number,
  percArtStudios: number,
): number {
  return totalSize - cateringSize;
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
    percArtStudios,
  );
  const hallSize = totalSize - cateringSize - artStudioSize;
  return {
    artStudioSize,
    cateringSize,
    hallSize,
  };
}
