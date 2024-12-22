'use client';

import { useState } from 'react';

interface RowData {
  totalSize: number;
  minCatering: number;
  percCatering: number;
  percHalls: number;
  percArtStudios: number;
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

export interface ScenarioVariables {
  costScenario: 'average' | 'min' | 'max';
  incomeScenario: 'average' | 'min' | 'max';
  terraceScenario: boolean;
}

export default function Page() {
  const [rows, setRows] = useState<RowData[]>([
    {
      totalSize: 500,
      minCatering: 200,
      percCatering: 0.3,
      percHalls: 0.1,
      percArtStudios: 0.6,
    },
    {
      totalSize: 750,
      minCatering: 200,
      percCatering: 0.3,
      percHalls: 0.1,
      percArtStudios: 0.6,
    },
    {
      totalSize: 1000,
      minCatering: 200,
      percCatering: 0.3,
      percHalls: 0.1,
      percArtStudios: 0.6,
    },
    {
      totalSize: 1500,
      minCatering: 200,
      percCatering: 0.3,
      percHalls: 0.1,
      percArtStudios: 0.6,
    },
  ]);
  const [variables, setVariables] = useState<Variables>({
    income: {
      artStudios: {
        minIncomePerM2: 14,
        maxIncomePerM2: 16,
      },
      catering: {
        peoplePerM2: {
          max: 4,
          normal: 2,
          terrace: 1.5,
        },
        expendure: {
          perPerson: 25,
          margin: 0.8,
        },
        open: {
          nightsPerWeek: 3,
        },
      },
    },
    expenses: {
      labourCosts: {
        minCostPerHour: 15,
        maxCostPerHour: 20,
        workingPersonPerHour: 2,
        hoursUsage: 10,
      },
      renovation: {
        maxCostPerM2: 500,
        minCostPerM2: 300,
        furnitureCater: 25000,
      },
      loanCosts: {
        interestRate: 0.1,
        duration: 10,
        loanAmount: 500000,
      },
      legalCosts: {
        notary: {
          minCost: 500,
          maxCost: 1000,
        },
        accountancy: {
          minCost: 800,
          maxCost: 800,
        },
        uboRegistration: 25,
        registerChamberOfCommerce: 80,
        taxationNumber: 105.5,
        registrationStockHolders: 25,
        exploitationPermitWithoutTerrarsse: 2200,
        exploitationPermitWithTerrarsse: 2600,
      },
    },
    energyUsage: {
      electricity: {
        costs: {
          minPerkWh: 0.0667,
          maxPerkWh: 0.6588,
          average: 0.15735,
        },
        catering: {
          minPerM2Kwh: 75,
          maxPerM2Kwh: 250,
        },
        office: {
          minPerM2Kwh: 60,
          maxPerM2Kwh: 100,
        },
      },
      gas: {
        costs: {
          minPerM3: 0.2616,
          maxPerM3: 2.783,
          average: 0.6329516666666668,
        },
        catering: {
          minPerM2Kwh: 21,
          maxPerM2Kwh: 40,
        },
        office: {
          minPerM2m3: 12,
          maxPerM2m3: 23,
        },
      },
    },
  });

  const [ScenarioVariables, setScenarioVariables] = useState<ScenarioVariables>(
    {
      costScenario: 'average',
      incomeScenario: 'average',
      terraceScenario: false,
    },
  );

  const handleRowChange = (
    index: number,
    field: keyof RowData,
    value: number,
  ) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        totalSize: 500,
        minCatering: 200,
        percCatering: 0.3,
        percHalls: 0.1,
        percArtStudios: 0.6,
      },
    ]);
  };

  const calculateExpactation = (row: RowData) => {
    const income: number = calculateExpectedIncome(row);
    const expense: number = calculateExpectedExpenses(row);
    const profit: number = parseFloat((income - expense).toFixed(2));
    return {
      income: income,
      expenses: expense,
      profit: profit,
    };
  };

  const calculateExpectedIncome = (row: RowData) => {
    const cateringSize: number = Math.max(
      row.minCatering,
      row.totalSize * row.percCatering,
    );
    const cateringIncome: number =
      cateringSize *
      variables.income.catering.peoplePerM2.normal *
      variables.income.catering.expendure.perPerson *
      variables.income.catering.expendure.margin *
      variables.income.catering.open.nightsPerWeek *
      4;
    const artSize: number =
      (row.totalSize - cateringSize - row.percHalls * row.totalSize) *
      row.percArtStudios;
    const artStudioIncome: number =
      artSize * variables.income.artStudios.minIncomePerM2;
    return cateringIncome + artStudioIncome;
  };
  const calculateExpectedExpenses = (row: RowData) => {
    let legalCosts = calculateLegalCosts();
    let loanCosts = calculateLoanCosts();
    let energyCosts = calculateEnergyCosts(row);
    return parseFloat((legalCosts + loanCosts).toFixed(2));
  };

  const calculateLoanCosts = (): number => {
    const interestRate = variables.expenses.loanCosts.interestRate;
    const duration = variables.expenses.loanCosts.duration;
    const loanAmount = variables.expenses.loanCosts.loanAmount;
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = duration * 12;

    return (
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
    );
  };
  const calculateEnergyCosts = (row: RowData): number => {
    let energyCosts = 0;
    const electricityCosts = variables.energyUsage.electricity.costs;
    const gasCosts = variables.energyUsage.gas.costs;
    const cateringElectricity = variables.energyUsage.electricity.catering;
    const officeElectricity = variables.energyUsage.electricity.office;
    const cateringGas = variables.energyUsage.gas.catering;
    const officeGas = variables.energyUsage.gas.office;
    const cateringSize = Math.max(
      row.minCatering,
      row.totalSize * row.percCatering,
    );
    const hallsSize = row.totalSize * row.percHalls;
    const artSize = row.totalSize * row.percArtStudios;
    const cateringElectricityCost =
      cateringSize *
      cateringElectricity.minPerM2Kwh *
      electricityCosts.minPerkWh;
    const officeElectricityCost =
      (row.totalSize - cateringSize - hallsSize) *
      officeElectricity.minPerM2Kwh *
      electricityCosts.minPerkWh;
    const cateringGasCost =
      cateringSize * cateringGas.minPerM2Kwh * gasCosts.minPerM3;
    const officeGasCost =
      (row.totalSize - cateringSize - hallsSize) *
      officeGas.minPerM2M3 *
      gasCosts.minPerM3;
    energyCosts =
      cateringElectricityCost +
      officeElectricityCost +
      cateringGasCost +
      officeGasCost;
    return energyCosts;
  };

  const calculateLegalCosts = (): number => {
    let legalCosts = 0;
    const notaryCosts = variables.expenses.legalCosts.notary;
    const accountancyCosts = variables.expenses.legalCosts.accountancy;
    const uboRegistration = variables.expenses.legalCosts.uboRegistration;
    const registerChamberOfCommerce =
      variables.expenses.legalCosts.registerChamberOfCommerce;
    const taxationNumber = variables.expenses.legalCosts.taxationNumber;
    const registrationStockHolders =
      variables.expenses.legalCosts.registrationStockHolders;
    const exploitationPermitWithoutTerrarsse =
      variables.expenses.legalCosts.exploitationPermitWithoutTerrarsse;
    const exploitationPermitWithTerrarsse =
      variables.expenses.legalCosts.exploitationPermitWithTerrarsse;
    legalCosts =
      notaryCosts.minCost +
      accountancyCosts.minCost +
      uboRegistration +
      registerChamberOfCommerce +
      taxationNumber +
      registrationStockHolders +
      exploitationPermitWithoutTerrarsse +
      exploitationPermitWithTerrarsse;
    return legalCosts;
  };

  return (
    <>
      <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
        <div className="rounded-lg bg-black p-3.5 lg:p-6">
          <div className="space-y-9">
            <div className="prose prose-sm prose-invert max-w-none">
              <h1 className="text-xl font-bold">Model input</h1>

              <h2 className="mt-6 text-lg font-bold">Model</h2>
              <button
                onClick={addRow}
                className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
              >
                Add Row
              </button>
              <table className="min-w-full bg-gray-800 text-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Total Size</th>
                    <th className="px-4 py-2">Min Catering</th>
                    <th className="px-4 py-2">Perc Catering</th>
                    <th className="px-4 py-2">Perc Halls</th>
                    <th className="px-4 py-2">Perc Art Studios</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        <input
                          type="number"
                          value={row.totalSize}
                          onChange={(e) =>
                            handleRowChange(
                              index,
                              'totalSize',
                              Number(e.target.value),
                            )
                          }
                          className="w-full rounded bg-gray-700 text-white"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="number"
                          value={row.minCatering}
                          onChange={(e) =>
                            handleRowChange(
                              index,
                              'minCatering',
                              Number(e.target.value),
                            )
                          }
                          className="w-full rounded bg-gray-700 text-white"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="number"
                          value={row.percCatering}
                          onChange={(e) =>
                            handleRowChange(
                              index,
                              'percCatering',
                              Number(e.target.value),
                            )
                          }
                          className="w-full rounded bg-gray-700 text-white"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="number"
                          value={row.percHalls}
                          onChange={(e) =>
                            handleRowChange(
                              index,
                              'percHalls',
                              Number(e.target.value),
                            )
                          }
                          className="w-full rounded bg-gray-700 text-white"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="number"
                          value={row.percArtStudios}
                          onChange={(e) =>
                            handleRowChange(
                              index,
                              'percArtStudios',
                              Number(e.target.value),
                            )
                          }
                          className="w-full rounded bg-gray-700 text-white"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
        <div className="rounded-lg bg-black p-3.5 lg:p-6">
          <div className="space-y-9">
            <div className="prose prose-sm prose-invert max-w-none">
              <h1 className="text-xl font-bold">Model results</h1>
              <h2 className="mt-6 text-lg font-bold">Expected Income Table</h2>
              <table className="min-w-full bg-gray-800 text-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Total Size</th>
                    <th className="px-4 py-2">Expected Income</th>
                    <th className="px-4 py-2">Expected Expense</th>
                    <th className="px-4 py-2">Expected Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => {
                    const expectation = calculateExpactation(row);
                    return (
                      <tr key={index}>
                        <td className="border px-4 py-2">{row.totalSize}</td>
                        <td className="border px-4 py-2">
                          {expectation.income}
                        </td>
                        <td className="border px-4 py-2">
                          {expectation.expenses}
                        </td>
                        <td className="border px-4 py-2">
                          {expectation.profit}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
