export interface Variables {
  income: Income;
  expenses: Expenses;
  energyUsage: EnergyUsage;
}

export interface EnergyUsage {
  electricity: Electricity;
  gas: Gas;
}

export interface Electricity {
  costs: ElectricityCosts;
  catering: { [key: string]: number };
  office: { [key: string]: number };
}

export interface ElectricityCosts {
  minPerkWh: number;
  maxPerkWh: number;
  average: number;
}

export interface Gas {
  costs: GasCosts;
  catering: { [key: string]: number };
  office: Office;
}

export interface GasCosts {
  minPerM3: number;
  maxPerM3: number;
  average: number;
}

export interface Office {
  minPerM2M3: number;
  maxPerM2M3: number;
}

export interface Expenses {
  labourCosts: LabourCosts;
  renovation: Renovation;
  loanCosts: LoanCosts;
  legalCosts: LegalCosts;
}

export interface LabourCosts {
  minCostPerHour: number;
  maxCostPerHour: number;
  workingPersonPerHour: number;
  hoursUsage: number;
}

export interface LegalCosts {
  notary: Accountancy;
  accountancy: Accountancy;
  uboRegistration: number;
  registerChamberOfCommerce: number;
  taxationNumber: number;
  registrationStockHolders: number;
  exploitationPermitWithoutTerrarsse: number;
  exploitationPermitWithTerrarsse: number;
}

export interface Accountancy {
  minCost: number;
  maxCost: number;
}

export interface LoanCosts {
  interestRate: number;
  duration: number;
  loanAmount: number;
}

export interface Renovation {
  maxCostPerM2: number;
  minCostPerM2: number;
  furnitureCater: number;
}

export interface Income {
  artStudios: ArtStudios;
  catering: Catering;
}

export interface ArtStudios {
  minIncomePerM2: number;
  maxIncomePerM2: number;
}

export interface Catering {
  peoplePerM2: PeoplePerM2;
  expendure: Expendure;
  open: Open;
}

export interface Open {
  nightsPerWeek: number;
}
export interface Expendure {
  perPerson: number;
  margin: number;
}

export interface PeoplePerM2 {
  max: number;
  normal: number;
  terrace: number;
}
