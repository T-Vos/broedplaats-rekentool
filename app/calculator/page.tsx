'use client';

import { RowData } from '#/lib/row';
import {
  ElectricityCosts,
  ElectricityUsage,
  GasCosts,
  GasUsage,
  Variables,
} from '#/lib/variables';
import { ScenarioVariables } from '#/lib/scenarioVariables';
import { useState } from 'react';
import { standardVariables, defaultRows, scenarioVariables } from './variables';
import {
  calculateArtStudioSize,
  calculateCateringSize,
  receiveFullRowCalculation,
} from './calculations';
import Button from '#/ui/button';

export default function Page() {
  const [rows, setRows] = useState<RowData[]>(defaultRows);
  const [variables, setVariables] = useState<Variables>(standardVariables);
  const [ScenarioVariables, setScenarioVariables] =
    useState<ScenarioVariables>(scenarioVariables);

  const handleRowChange = (
    index: number,
    field: keyof RowData,
    value: number,
  ) => {
    const newRows = [...rows];
    let row = newRows[index];
    const { artStudioSize, cateringSize, hallSize } = receiveFullRowCalculation(
      row.totalSize,
      row.minCatering,
      row.percCatering,
      row.percHalls,
      row.percArtStudios,
    );
    row.artStudioSize = artStudioSize;
    row.cateringSize = cateringSize;
    row.hallSize = hallSize;
    setRows(newRows);
  };

  const addRow = () => {
    const totalSize = 500;
    const minCatering = 200;
    const percCatering = 0.3;
    const percHalls = 0.1;
    const percArtStudios = 0.6;
    const { artStudioSize, cateringSize, hallSize } = receiveFullRowCalculation(
      totalSize,
      minCatering,
      percCatering,
      percHalls,
      percArtStudios,
    );
    setRows([
      ...rows,
      {
        id: (rows.length + 1).toString(),
        totalSize: totalSize,
        minCatering: minCatering,
        percCatering: percCatering,
        percHalls: percHalls,
        percArtStudios: percArtStudios,
        artStudioSize: artStudioSize,
        cateringSize: cateringSize,
        hallSize: hallSize,
        hallEclectricity: null,
        cateringGasCost: null,
        officeGasCost: null,
        hallGas: null,
        totalEnergyCost: null,
      },
    ]);
  };

  const calculateExpactation = (row: RowData) => {
    const income: number = parseFloat(calculateExpectedIncome(row).toFixed(2));
    const expense: number = calculateExpectedExpenses(row);
    const profit: number = parseFloat((income - expense).toFixed(2));
    return {
      income: income,
      expenses: expense,
      profit: profit,
    };
  };

  const calculateExpectedIncome = (row: RowData): number => {
    checkCorrectVariables(row);
    row.artStudioSize = row.artStudioSize || 1;
    row.cateringSize = row.cateringSize || 1;
    const cateringIncome: number =
      row.cateringSize *
      variables.income.catering.peoplePerM2.normal *
      variables.income.catering.expenditure.perPerson *
      variables.income.catering.expenditure.margin *
      variables.income.catering.open.length *
      4; // 4 weeks in a month - This could be improved

    const artStudioIncome: number =
      row.artStudioSize * variables.income.artStudios.minIncomePerM2;
    return cateringIncome + artStudioIncome;
  };

  const calculateExpectedExpenses = (row: RowData) => {
    let legalCosts = calculateLegalCosts();
    let loanCosts = calculateLoanCosts();
    let energyCosts = calculateEnergyCosts(row);
    return parseFloat((legalCosts + loanCosts + energyCosts).toFixed(2));
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
    row.cateringSize = row.cateringSize || 1;
    row.artStudioSize = row.artStudioSize || 1;
    row.hallSize = row.hallSize || 1;

    const electricityCosts = variables.energyUsage.electricity.costs;
    const gasCosts = variables.energyUsage.gas.costs;

    const cateringElectricityUsage = variables.energyUsage.electricity.catering;
    const officeElectricityUsage = variables.energyUsage.electricity.office;
    const cateringGasUsage = variables.energyUsage.gas.catering;
    const officeGasUsage = variables.energyUsage.gas.office;

    const cateringElectricityCost = calculateEnergyCostOfSurface(
      cateringElectricityUsage,
      electricityCosts,
      row.cateringSize,
    );
    row.cateringElectricityCost = cateringElectricityCost / 12;

    const officeElectricityCost = calculateEnergyCostOfSurface(
      officeElectricityUsage,
      electricityCosts,
      row.artStudioSize,
    );
    row.officeElectricityCost = officeElectricityCost / 12;

    const hallEclectricity = calculateEnergyCostOfSurface(
      officeElectricityUsage,
      electricityCosts,
      row.hallSize,
    );
    row.hallEclectricity = hallEclectricity / 12;

    const cateringGasCost = calculateGasCost(
      cateringGasUsage,
      gasCosts,
      row.cateringSize,
    );
    row.cateringGasCost = cateringGasCost / 12;

    const officeGasCost = calculateGasCost(
      officeGasUsage,
      gasCosts,
      row.artStudioSize,
    );
    row.officeGasCost = officeGasCost / 12;

    const hallGas = calculateGasCost(officeGasUsage, gasCosts, row.hallSize);
    row.hallGas = hallGas;

    energyCosts =
      hallGas +
      hallEclectricity +
      cateringElectricityCost +
      cateringGasCost +
      officeElectricityCost +
      officeGasCost;

    row.totalEnergyCost = energyCosts;
    return energyCosts;
  };
  function calculateEnergyCostOfSurface(
    electricityUsage: ElectricityUsage,
    costs: ElectricityCosts,
    surface: number,
  ): number {
    let cost = null;
    let usage = null;
    switch (scenarioVariables.costScenario) {
      case 'min':
        cost = costs.minPerkWh;
        break;
      case 'max':
        cost = costs.maxPerkWh;
        break;
      case 'average':
        cost = costs.average || (costs.maxPerkWh + costs.minPerkWh) / 2;
        break;
    }
    switch (scenarioVariables.usageScenario) {
      case 'min':
        usage = electricityUsage.minPerM2Kwh;
        break;
      case 'max':
        usage = electricityUsage.maxPerM2Kwh;
        break;
      case 'average':
        usage =
          electricityUsage.average ||
          (electricityUsage.maxPerM2Kwh + electricityUsage.minPerM2Kwh) / 2;
        break;
    }
    // console.log('cost', cost);
    // console.log('usage', usage);
    // console.log('surface', surface);
    return cost * usage * surface;
  }
  const calculateGasCost = (
    gasUsage: GasUsage,
    costs: GasCosts,
    surface: number,
  ): number => {
    let cost = null;
    let usage = null;
    switch (scenarioVariables.costScenario) {
      case 'min':
        cost = costs.minPerM3;
        break;
      case 'max':
        cost = costs.maxPerM3;
        break;
      case 'average':
        cost = costs.average || (costs.minPerM3 + costs.maxPerM3) / 2;
        break;
    }
    switch (scenarioVariables.usageScenario) {
      case 'min':
        usage = gasUsage.minM3Per2;
        break;
      case 'max':
        usage = gasUsage.maxM3Per2;
        break;
      case 'average':
        usage =
          gasUsage.average || (gasUsage.minM3Per2 + gasUsage.maxM3Per2) / 2;
        break;
    }
    return cost * usage * surface;
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
              <Button onClick={addRow}>Add Row</Button>
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
      <div className="flex-col justify-start gap-5">
        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black p-3.5 lg:p-6">
            <div className="space-y-9">
              <div className="prose prose-sm prose-invert max-w-none">
                <h1 className="text-xl font-bold">
                  Model results for an average month
                </h1>
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
        {rows.map((row, index) => {
          return (
            <div className="mt-5 rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black p-3.5 lg:p-6">
                <h2>{index + 1}</h2>
                <table>
                  <tbody>
                    {Object.keys(row).map((key) => {
                      return (
                        <tr>
                          <td>{key}</td>
                          <td>{row[key as keyof RowData]?.toString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  function checkCorrectVariables(row: RowData) {
    let updated = false;
    if (!row.cateringSize || row.cateringSize === 0) {
      row.cateringSize = calculateCateringSize(
        row.minCatering,
        row.totalSize,
        row.percCatering,
      );
      updated = true;
    }
    if (!row.artStudioSize || row.artStudioSize === 0) {
      row.artStudioSize = calculateArtStudioSize(
        row.totalSize,
        row.cateringSize,
        row.percHalls,
      );
      updated = true;
    }
    if (updated) {
      setRows((prevRows) => {
        const newRows = [...prevRows];
        newRows[rows.indexOf(row)] = row;
        return newRows;
      });
    }
  }
}
