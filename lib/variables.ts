export interface ExogenousVariables {
  prijsPerVierkanteMeter: number;
  interestRate: number;
  leningDuurJaren: number;
  kostenVerbouwing: number;
  financieringGemeenteVerbouwing: number;
  uboRegistration: number;
  registerChamberOfCommerce: number;
  taxationNumber: number;
  registrationStockHolders: number;
  exploitationPermitWithoutTerrarsse: number;
  accountant: number;
  notaris: number;
  percentageFundedLoan: number;
  nonLoaninterestRate: number;
  overdrachtsBelasting: number;
  overdrachtNotaris: number;
  statutenakte: number;
}

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
  catering: ElectricityUsage;
  office: ElectricityUsage;
}

export interface ElectricityCosts {
  minPerkWh: number;
  maxPerkWh: number;
  average?: number;
}

export interface ElectricityUsage {
  minPerM2Kwh: number;
  maxPerM2Kwh: number;
  average?: number;
}

export interface Gas {
  costs: GasCosts;
  catering: GasUsage;
  office: GasUsage;
}

export interface GasCosts {
  minPerM3: number;
  maxPerM3: number;
  average?: number;
}

export interface GasUsage {
  minM3Per2: number;
  maxM3Per2: number;
  average?: number;
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
  calculatingVariable: number;
}

export interface Catering {
  peoplePerM2: PeoplePerM2;
  expenditure: Expenditure;
  open: Open[];
}

export interface Open {
  openNight:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';
  timeOpen: number;
  timeClose: number;
}

export interface Expenditure {
  perPerson: number;
  margin: number;
}

export interface PeoplePerM2 {
  max: number;
  normal: number;
  terrace: number;
}
