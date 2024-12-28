import { RowData } from '#/lib/row';
import { ExogenousVariables } from '#/lib/variables';
import clsx from 'clsx';

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
  const legalCosts =
    ExogenousVariables.uboRegistration +
    ExogenousVariables.registerChamberOfCommerce +
    ExogenousVariables.taxationNumber +
    ExogenousVariables.registrationStockHolders +
    ExogenousVariables.exploitationPermitWithoutTerrarsse +
    ExogenousVariables.accountant +
    ExogenousVariables.notaris;
  const areaCost =
    rowVariables.totalSize * ExogenousVariables.prijsPerVierkanteMeter;
  const areaRenovation =
    rowVariables.totalSize * ExogenousVariables.kostenVerbouwing;
  const areaRenovationSupport =
    rowVariables.totalSize * ExogenousVariables.financieringGemeenteVerbouwing;
  const renovationNetto = areaRenovation - areaRenovationSupport;

  const totalAmount = areaCost + renovationNetto + legalCosts;
  const totalBank = totalAmount * ExogenousVariables.percentageFundedLoan;
  const totalPrivate =
    totalAmount * (1 - ExogenousVariables.percentageFundedLoan);

  const bankLoan = annuityLoanCalculator(
    totalBank,
    ExogenousVariables.leningDuurJaren,
    ExogenousVariables.interestRate,
  );
  const privateLoan = annuityLoanCalculator(
    totalPrivate,
    ExogenousVariables.leningDuurJaren,
    ExogenousVariables.nonLoaninterestRate,
  );

  const totalMonthlyLoan = privateLoan + bankLoan;

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
          description: 'Accountant',
          value: ExogenousVariables.accountant,
          includeInSum: true,
        },
        {
          description: 'Notaris',
          value: ExogenousVariables.notaris,
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
          description: 'Jurridsche kosten aankoop',
          value: '??',
          includeInSum: false,
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

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="w-full">
              <tbody>
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
                  let rowClass = clsx('border-white-700 border-b px-2', bg);
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
                <tr
                  className="border-t-4 border-t-slate-100 bg-slate-500"
                  key="total-sum"
                >
                  <td className="p-2">Start kosten totaal</td>
                  <td></td>
                  <td className="pr-2 text-right">
                    {formatEuro.format(
                      table.reduce((acc, tableGroup) => {
                        const groupSum = tableGroup.groupItems
                          .filter((x) => x.includeInSum)
                          .reduce(
                            (acc, curr) =>
                              typeof curr.value === 'number'
                                ? acc + curr.value
                                : acc + 0,
                            0,
                          );
                        return acc + groupSum;
                      }, 0),
                    )}
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
                <tr className="bg-slate-500">
                  <td className="py-4 pl-2 font-bold">
                    Totaal maandelijkse lasten
                  </td>
                  <td></td>
                  <td className="py-4 pr-2 text-right font-bold">
                    {formatEuro.format(totalMonthlyLoan)}
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
};