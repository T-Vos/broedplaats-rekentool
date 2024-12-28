import { RowData } from '#/lib/row';
import { ScenarioVariables } from '#/lib/scenarioVariables';
import { Variables } from '#/lib/variables';

export const standardVariables: Variables = {
  income: {
    artStudios: {
      minIncomePerM2: 15,
      maxIncomePerM2: 20,
      calculatingVariable: 18.66,
    },
    catering: {
      peoplePerM2: {
        max: 4,
        normal: 2,
        terrace: 1.5,
      },
      expenditure: {
        perPerson: 25,
        margin: 0.8,
      },
      open: [
        {
          openNight: 'Thursday',
          timeClose: 23,
          timeOpen: 12,
        },
        {
          openNight: 'Friday',
          timeClose: 23,
          timeOpen: 12,
        },
        {
          openNight: 'Wednesday',
          timeClose: 23,
          timeOpen: 12,
        },
        {
          openNight: 'Saturday',
          timeClose: 23,
          timeOpen: 12,
        },
      ],
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
        minM3Per2: 21,
        maxM3Per2: 40,
      },
      office: {
        minM3Per2: 12,
        maxM3Per2: 23,
      },
    },
  },
};

export const defaultRows: RowData[] = [
  {
    id: '1',
    totalSize: 250,
    minCatering: 200,
    percCatering: 0.3,
    percHalls: 0.2,
    percArtStudios: 0.5,
    artStudioSize: null,
    cateringSize: null,
    hallSize: null,
    hallEclectricity: null,
    cateringGasCost: null,
    officeGasCost: null,
    hallGas: null,
    totalEnergyCost: null,
  },
  {
    id: '2',
    totalSize: 371.76,
    minCatering: 200,
    percCatering: 0.3,
    percHalls: 0.2,
    percArtStudios: 0.5,
    artStudioSize: null,
    cateringSize: null,
    hallSize: null,
    hallEclectricity: null,
    cateringGasCost: null,
    officeGasCost: null,
    hallGas: null,
    totalEnergyCost: null,
  },
  {
    id: '3',
    totalSize: 500,
    minCatering: 200,
    percCatering: 0.3,
    percHalls: 0.2,
    percArtStudios: 0.5,
    artStudioSize: null,
    cateringSize: null,
    hallSize: null,
    hallEclectricity: null,
    cateringGasCost: null,
    officeGasCost: null,
    hallGas: null,
    totalEnergyCost: null,
  },
];

export const scenarioVariables: ScenarioVariables = {
  costScenario: 'average',
  incomeScenario: 'average',
  terraceScenario: false,
  usageScenario: 'average',
};
