import { RowData } from '#/lib/row';
import { ExogenousVariables } from '#/lib/variables';
import Button from '#/ui/button';
import clsx from 'clsx';
import React, { useState } from 'react';
import {
  calculateArtStudioSize,
  calculateCateringSize,
} from '../calculator/calculations';

export const Costs = ({
  ExogenousVariables,
  rowVariables,
}: {
  ExogenousVariables: ExogenousVariables;
  rowVariables: RowData;
}) => {
  let formatEuro = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  checkCorrectVariables(rowVariables);

  const areaCost =
    rowVariables.totalSize * ExogenousVariables.prijsPerVierkanteMeter;
  const areaRenovation =
    rowVariables.totalSize * ExogenousVariables.kostenVerbouwing;
  const areaRenovationSupport =
    rowVariables.totalSize * ExogenousVariables.financieringGemeenteVerbouwing;

  const table = [
    {
      groupName: 'Juridische kosten BV',
      groupItems: [
        {
          description: 'UBO registratie',
          value: ExogenousVariables.uboRegistration,
          includeInSum: true,
        },
        {
          description: 'Inschrijving Kamer van Koophandel',
          value: ExogenousVariables.registerChamberOfCommerce,
          includeInSum: true,
        },
        {
          description: 'Belastingnummer',
          value: ExogenousVariables.taxationNumber,
          includeInSum: true,
        },
        {
          description: 'Inschrijving aandeelhouders',
          value: ExogenousVariables.registrationStockHolders,
          includeInSum: true,
        },
        {
          description: 'Exploitatievergunning',
          value: ExogenousVariables.exploitationPermitWithoutTerrarsse,
          includeInSum: true,
        },
        {
          description: 'Exploitatievergunning buiten omgevingplan',
          value: ExogenousVariables.exploitationOutsideOmgevingsplan,
          includeInSum: true,
        },
        {
          description: 'Accountant',
          value: ExogenousVariables.accountant,
          includeInSum: true,
        },
        {
          description: 'Notaris',
          value: ExogenousVariables.notaris,
          includeInSum: true,
        },
        {
          description: 'Afwijken omgevingsplan',
          value:
            (ExogenousVariables.permitOutsideOmgevingsplan / 100) *
            areaRenovation,
          includeInSum: true,
        },
        {
          description: 'Toezicht brandveiligheid',
          value:
            (ExogenousVariables.supervisionFireSafety / 100) * areaRenovation,
          includeInSum: true,
        },
      ],
    },
    {
      groupName: 'Aankoop kavel',
      groupItems: [
        {
          description: 'Oppervlakte',
          value: rowVariables.totalSize,
          includeInSum: false,
          afterValue: 'm&sup2;',
        },
        {
          description: 'Kosten aankoop kavel',
          value: areaCost,
          includeInSum: true,
        },
        {
          description: 'Overdrachtsbelasting',
          value: (ExogenousVariables.overdrachtsBelasting / 100) * areaCost,
          includeInSum: true,
        },
        {
          description: 'Notaris overdracht',
          value: ExogenousVariables.overdrachtNotaris,
          includeInSum: true,
        },
      ],
    },
    {
      groupName: 'Verbouwing kavel',
      groupItems: [
        {
          description: 'Verbouwing kosten',
          value: areaRenovation,
          includeInSum: true,
        },
        {
          description: 'Subsidie',
          value: -areaRenovationSupport,
          includeInSum: true,
        },
      ],
    },
  ];

  const totalAmount = table.reduce((acc, tableGroup) => {
    const groupSum = tableGroup.groupItems
      .filter((x) => x.includeInSum)
      .reduce(
        (acc, curr) =>
          typeof curr.value === 'number' ? acc + curr.value : acc + 0,
        0,
      );
    return acc + groupSum;
  }, 0);
  const totalBank = totalAmount * ExogenousVariables.percentageFundedLoan;
  const totalPrivate =
    totalAmount * (1 - ExogenousVariables.percentageFundedLoan);

  const bankLoan = annuityLoanCalculator(
    totalBank,
    ExogenousVariables.leningDuurJaren,
    ExogenousVariables.interestRate / 100 / 12,
  );
  const privateLoan = annuityLoanCalculator(
    totalPrivate,
    ExogenousVariables.leningDuurJaren,
    ExogenousVariables.nonLoaninterestRate / 100 / 12,
  );

  const totalMonthlyLoan = privateLoan + bankLoan;

  const energyUsageTable = [
    {
      groupName: 'Gas',
      groupItems: [
        {
          description: 'Gasverbruik Horeca',
          value:
            (ExogenousVariables.gasUsageCateringPerM2M3PerYear / 12) *
            (rowVariables.cateringSize || 0) *
            ExogenousVariables.gasCostM3,
          includeInSum: true,
        },
        {
          description: 'Gasverbruik ateliers',
          value:
            (ExogenousVariables.gasUsageOfficePerM2M3PerYear / 12) *
            (rowVariables.artStudioSize || 0) *
            ExogenousVariables.gasCostM3,
          includeInSum: true,
        },
        {
          description: 'Gasverbruik overig',
          value:
            (ExogenousVariables.gasUsageOfficePerM2M3PerYear / 12) *
            (rowVariables.hallSize || 0) *
            ExogenousVariables.gasCostM3,
          includeInSum: true,
        },
      ],
    },
    {
      groupName: 'Elektriciteit',
      groupItems: [
        {
          description: 'Electiricteitverbruik Horeca',
          value:
            (ExogenousVariables.electricityUsageCateringPerM2kWhPerYear / 12) *
            (rowVariables.cateringSize || 0) *
            ExogenousVariables.electricityCostkWh,
          includeInSum: true,
        },
        {
          description: 'Electiricteitverbruik ateliers',
          value:
            (ExogenousVariables.electricityUsageOfficePerM2kWhPerYear / 12) *
            (rowVariables.artStudioSize || 0) *
            ExogenousVariables.electricityCostkWh,
          includeInSum: true,
        },
        {
          description: 'Electiricteitverbruik overig',
          value:
            (ExogenousVariables.electricityUsageOfficePerM2kWhPerYear / 12) *
            (rowVariables.hallSize || 0) *
            ExogenousVariables.electricityCostkWh,
          includeInSum: true,
        },
      ],
    },
  ];
  const totalEnergyCost = energyUsageTable.reduce((acc, tableGroup) => {
    const groupSum = tableGroup.groupItems
      .filter((x) => x.includeInSum)
      .reduce(
        (acc, curr) =>
          typeof curr.value === 'number' ? acc + curr.value : acc + 0,
        0,
      );
    return acc + groupSum;
  }, 0);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="my-3">
            <Button onClick={toggleExpand}>
              {isExpanded ? 'Verberg details' : 'Meer details'}
            </Button>
          </div>
          <div className="my-8">
            <div className="flex h-6 w-full">
              <div
                className="rounded-l-lg bg-slate-600"
                style={{
                  width: `${((rowVariables.cateringSize || 0) / rowVariables.totalSize) * 100}%`,
                }}
              >
                <span className="inline-block w-full text-center">
                  Horeca: {rowVariables.cateringSize?.toFixed(1)}m&sup2;
                </span>
              </div>
              <div
                className={clsx(
                  'bg-slate-700',
                  (rowVariables.hallSize ?? 0) > 0 ? '' : 'rounded-r-lg',
                )}
                style={{
                  width: `${((rowVariables.artStudioSize ?? 0) / rowVariables.totalSize) * 100}%`,
                }}
              >
                <span className="inline-block w-full text-center">
                  Atelier: {rowVariables.artStudioSize?.toFixed(1)}m&sup2;
                </span>
              </div>
              <div
                className="rounded-r-lg bg-slate-500"
                style={{
                  width: `${((rowVariables.hallSize ?? 0) / rowVariables.totalSize) * 100}%`,
                }}
              >
                <span className="inline-block w-full text-center">
                  Overig: {rowVariables.hallSize?.toFixed(1)}m&sup2;
                </span>
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <table className="w-full">
              <tbody
                className={clsx(
                  'transition-all duration-500',
                  isExpanded ? 'max-h-fit' : 'max-h-0 overflow-hidden',
                )}
              >
                {table.map((tableGroup, index) => {
                  const summation = tableGroup.groupItems
                    .filter((x) => x.includeInSum)
                    .reduce(
                      (acc, curr) =>
                        typeof curr.value === 'number'
                          ? acc + curr.value
                          : acc + 0,
                      0,
                    );
                  let bg = index % 2 == 0 ? 'bg-gray-800' : 'bg-gray-600';
                  let collapse = isExpanded ? '' : 'hidden';
                  let rowClass = clsx(
                    'border-white-700 border-b px-2',
                    bg,
                    collapse,
                  );
                  return (
                    <>
                      <tr className={rowClass} key={index}>
                        <td colSpan={3} className="py-2 pl-2 font-semibold">
                          {tableGroup.groupName}
                        </td>
                      </tr>
                      {tableGroup.groupItems.map(
                        (groupItems, indexGroupItems) => {
                          return (
                            <tr
                              className={rowClass}
                              key={`${index}-${indexGroupItems}`}
                            >
                              <td className="pl-4 italic">
                                {groupItems.description}
                              </td>
                              <td className="text-right italic">
                                {displayvalue(groupItems)}
                              </td>
                              <td></td>
                            </tr>
                          );
                        },
                      )}
                      <tr className={rowClass} key={`${index}-sum`}>
                        <td className="py-2 pl-2">
                          {tableGroup.groupName} som
                        </td>
                        <td></td>
                        <td className="pr-2 text-right">
                          {formatEuro.format(summation)}
                        </td>
                      </tr>
                    </>
                  );
                })}
                {isExpanded && (
                  <>
                    <tr
                      className="border-t-4 border-t-slate-100 bg-slate-500"
                      key="total-sum"
                    >
                      <td className="p-2">Start kosten totaal</td>
                      <td></td>
                      <td className="pr-2 text-right">
                        {formatEuro.format(totalAmount)}
                      </td>
                    </tr>
                    <tr className="bg-slate-700">
                      <td className="pl-2">Bancaire Lening</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="bg-slate-700">
                      <td className="pl-4 italic">Lening hoeveelheid</td>
                      <td className="text-right italic">
                        {formatEuro.format(totalBank)}
                      </td>
                      <td></td>
                    </tr>
                    <tr className="bg-slate-700">
                      <td className="pl-2">Maandelijkse last</td>
                      <td></td>
                      <td className="pr-2 text-right">
                        {formatEuro.format(bankLoan)}
                      </td>
                    </tr>
                    <tr className="bg-slate-600">
                      <td className="pl-2">Onderhandse Lening</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="bg-slate-600">
                      <td className="pl-4 italic">Lening hoeveelheid</td>
                      <td className="text-right italic">
                        {formatEuro.format(totalPrivate)}
                      </td>
                      <td></td>
                    </tr>
                    <tr className="bg-slate-600">
                      <td className="pl-2 ">Maandelijkse last</td>
                      <td></td>
                      <td className="pr-2 text-right">
                        {formatEuro.format(privateLoan)}
                      </td>
                    </tr>
                  </>
                )}
                <tr className="bg-slate-500">
                  <td className="py-4 pl-2 font-bold">
                    Totaal maandelijkse lasten
                  </td>
                  <td></td>
                  <td className="py-4 pr-2 text-right font-bold">
                    {formatEuro.format(totalMonthlyLoan)}
                  </td>
                </tr>
                <tr className="bg-slate-600">
                  <td className="py-2 pl-2 italic">
                    Last per m&sup2; per maand
                  </td>
                  <td></td>
                  <td className="pr-2 text-right italic">
                    {formatEuro.format(
                      totalMonthlyLoan / rowVariables.totalSize,
                    )}
                  </td>
                </tr>
                {energyUsageTable.map((tableGroup, index) => {
                  const summation = tableGroup.groupItems
                    .filter((x) => x.includeInSum)
                    .reduce(
                      (acc, curr) =>
                        typeof curr.value === 'number'
                          ? acc + curr.value
                          : acc + 0,
                      0,
                    );
                  let bg = index % 2 == 0 ? 'bg-gray-800' : 'bg-gray-600';
                  let collapse = isExpanded ? '' : 'hidden';
                  let rowClass = clsx(
                    'border-white-700 border-b px-2',
                    bg,
                    collapse,
                  );
                  return (
                    <>
                      <tr className={rowClass} key={index}>
                        <td colSpan={3} className="py-2 pl-2 font-semibold">
                          {tableGroup.groupName}
                        </td>
                      </tr>
                      {tableGroup.groupItems.map(
                        (groupItems, indexGroupItems) => {
                          return (
                            <tr
                              className={rowClass}
                              key={`${index}-${indexGroupItems}`}
                            >
                              <td className="pl-4 italic">
                                {groupItems.description}
                              </td>
                              <td className="text-right italic">
                                {displayvalue(groupItems)}
                              </td>
                              <td></td>
                            </tr>
                          );
                        },
                      )}
                      <tr className={rowClass} key={`${index}-sum`}>
                        <td className="py-2 pl-2">
                          {tableGroup.groupName} som
                        </td>
                        <td></td>
                        <td className="pr-2 text-right">
                          {formatEuro.format(summation)}
                        </td>
                      </tr>
                    </>
                  );
                })}
                <tr className="bg-slate-500">
                  <td colSpan={2} className="py-4 pl-2 font-bold">
                    Totaal maandelijkse energie kosten
                  </td>
                  <td className="py-4 pr-2 text-right font-bold">
                    {formatEuro.format(totalEnergyCost)}
                  </td>
                </tr>
                <tr className="bg-slate-600">
                  <td colSpan={2} className="py-2 pl-2 italic">
                    Indicatie maandelijkse kosten
                  </td>
                  <td className="pr-2 text-right italic">
                    {formatEuro.format(totalEnergyCost + totalMonthlyLoan)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  function annuityLoanCalculator(
    totalValue: number,
    duration: number,
    interestRate: number,
  ) {
    const montlyRent = interestRate / 12;
    const periods = duration * 12;
    const divisor = 1 - Math.pow(1 + montlyRent, -periods);
    const annuityLoan = (montlyRent / divisor) * totalValue;
    return annuityLoan;
  }

  function displayvalue(groupItems: {
    description: string;
    value: number | string;
    includeInSum: boolean;
    afterValue?: string | undefined;
    beforValue?: string | undefined;
  }) {
    if (groupItems.includeInSum && typeof groupItems.value === 'number')
      return formatEuro.format(groupItems.value);
    return (
      <>
        {groupItems.beforValue ? groupItems.beforValue : ''}
        {groupItems.value}
        {groupItems.afterValue ? (
          <span dangerouslySetInnerHTML={{ __html: groupItems.afterValue }} />
        ) : (
          ''
        )}
      </>
    );
  }
  function checkCorrectVariables(row: RowData) {
    if (!row.cateringSize || row.cateringSize === 0) {
      row.cateringSize = calculateCateringSize(
        row.minCatering,
        row.totalSize,
        row.percCatering,
      );
    }
    if (!row.artStudioSize || row.artStudioSize === 0) {
      row.artStudioSize = calculateArtStudioSize(
        row.totalSize,
        row.cateringSize,
        row.percHalls,
      );
    }
    if (!row.hallSize || row.hallSize === 0) {
      row.hallSize = row.totalSize - row.cateringSize - row.artStudioSize;
    }
  }
};
