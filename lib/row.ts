export interface RowData {
  id: string;
  totalSize: number;
  minCatering: number;
  percCatering: number;
  percHalls: number;
  percArtStudios: number;
  artStudioSize?: number | null;
  cateringSize?: number | null;
  hallSize?: number | null;
  cateringElectricityCost?: number | null;
  officeElectricityCost?: number | null;
  hallEclectricity: number | null;
  cateringGasCost: number | null;
  officeGasCost: number | null;
  hallGas: number | null;
  totalEnergyCost: number | null;
}
