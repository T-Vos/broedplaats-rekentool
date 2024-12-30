'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Slider } from '#/ui/slider';
import { RowData } from '#/lib/row';
import { defaultRows } from '../calculator/variables';
import { Costs } from './_cost';
import { ExogenousVariables } from '#/lib/variables';
import { receiveFullRowCalculation } from '../calculator/calculations';
import Button from '#/ui/button';
import { ShareIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
const page = () => {
  const [copied, setCopied] = useState(false);
  const [rows, setRows] = useState<RowData[]>(defaultRows);
  const [variables, setVariables] = useState<ExogenousVariables>({
    prijsPerVierkanteMeter: 1300,
    interestRate: 7.5,
    leningDuurJaren: 10,
    kostenVerbouwing: 500,
    financieringGemeenteVerbouwing: 350,
    percentageFundedLoan: 0.9,
    nonLoaninterestRate: 3,
    uboRegistration: 25,
    registerChamberOfCommerce: 80,
    taxationNumber: 105.5,

    registrationStockHolders: 25,
    exploitationPermitWithoutTerrarsse: 2200,
    accountant: 800,
    notaris: 750,
    overdrachtsBelasting: 10.4,
    overdrachtNotaris: 800,
    statutenakte: 50,
    exploitationOutsideOmgevingsplan: 18000,
    supervisionFireSafety: 0.36,
    permitOutsideOmgevingsplan: 2.9,
    gasUsageCateringPerM2M3PerYear: 50,
    gasUsageOfficePerM2M3PerYear: 23,
    gasCostM3: 0.63295166,
    electricityUsageCateringPerM2kWhPerYear: 250,
    electricityUsageOfficePerM2kWhPerYear: 100,
    electricityCostkWh: 0.15735,
  });
  const pathname = usePathname();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const queryVariables: Partial<ExogenousVariables> = {};
    query.forEach((value, key) => {
      if (key in variables) {
        queryVariables[key as keyof ExogenousVariables] = parseFloat(value);
      }
    });

    if (Object.keys(queryVariables).length > 0) {
      setVariables((prevVariables) => ({
        ...prevVariables,
        ...queryVariables,
      }));
    }

    const queryRows = query.get('rows');
    if (queryRows) {
      setRows(JSON.parse(queryRows));
    }
  }, []);

  const shareURL = () => {
    console.log(pathname);
    const query = new URLSearchParams({
      ...variables,
      rows: JSON.stringify(rows),
    } as any).toString();
    const url = `${window.location.origin}${pathname}?${query}`;
    navigator.clipboard.writeText(url);
    console.log(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 750);
  };

  const handleInputChangeSlider =
    (variableName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setVariables({
        ...variables,
        [variableName]: parseFloat(event.target.value),
      });
    };

  const variablesInputConfig = [
    {
      type: 'Kavel',
      items: [
        {
          name: 'prijsPerVierkanteMeter',
          render: () => (
            <Slider
              min={100}
              max={2000}
              step={1}
              value={variables.prijsPerVierkanteMeter}
              onChange={handleInputChangeSlider('prijsPerVierkanteMeter')}
              label="Prijs per m&sup2;"
            />
          ),
        },
        {
          name: 'overdrachtNotaris',
          render: () => (
            <Slider
              min={0}
              max={1300}
              step={10}
              value={variables.overdrachtNotaris}
              onChange={handleInputChangeSlider('overdrachtNotaris')}
              label="overdracht notaris"
            />
          ),
        },
        {
          name: 'overdrachtsBelasting',
          render: () => (
            <Slider
              min={0}
              max={30}
              step={0.1}
              value={variables.overdrachtsBelasting}
              onChange={handleInputChangeSlider('overdrachtsBelasting')}
              label="Overdrachtsbelasting"
            />
          ),
        },
        {
          name: 'kostenVerbouwing',
          render: () => (
            <Slider
              min={150}
              max={1000}
              step={10}
              value={variables.kostenVerbouwing}
              onChange={handleInputChangeSlider('kostenVerbouwing')}
              label="Kosten verbouwing per m&sup2;"
            />
          ),
        },
        {
          name: 'financieringGemeenteVerbouwing',
          render: () => (
            <Slider
              min={0}
              max={1000}
              step={10}
              value={variables.financieringGemeenteVerbouwing}
              onChange={handleInputChangeSlider(
                'financieringGemeenteVerbouwing',
              )}
              label="Subsidie verbouwing per m&sup2;"
            />
          ),
        },
      ],
    },
    {
      type: 'Lening',
      items: [
        {
          name: 'interestRate',
          render: () => (
            <Slider
              min={0}
              max={30}
              step={0.01}
              value={variables.interestRate}
              onChange={handleInputChangeSlider('interestRate')}
              label="Rente bank"
            />
          ),
        },
        {
          name: 'leningDuurJaren',
          render: () => (
            <Slider
              min={1}
              max={30}
              step={1}
              value={variables.leningDuurJaren}
              onChange={handleInputChangeSlider('leningDuurJaren')}
              label="Lening duur jaren"
            />
          ),
        },
        {
          name: 'percentageFundedLoan',
          render: () => (
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={variables.percentageFundedLoan}
              onChange={handleInputChangeSlider('percentageFundedLoan')}
              label="Verhouding banklening"
            />
          ),
        },
        {
          name: 'nonLoaninterestRate',
          render: () => (
            <Slider
              min={0}
              max={12}
              step={0.01}
              value={variables.nonLoaninterestRate}
              onChange={handleInputChangeSlider('nonLoaninterestRate')}
              label="Rente onderhandselening"
            />
          ),
        },
      ],
    },
    {
      type: 'Energie verbruik',
      items: [
        {
          name: 'gasUsageCateringPerM2M3PerYear',
          render: () => (
            <Slider
              min={0}
              max={100}
              step={1}
              value={variables.gasUsageCateringPerM2M3PerYear}
              onChange={handleInputChangeSlider(
                'gasUsageCateringPerM2M3PerYear',
              )}
              label="Gasverbruik horeca per m&sup2; per jaar"
            />
          ),
        },
        {
          name: 'gasUsageOfficePerM2M3PerYear',
          render: () => (
            <Slider
              min={0}
              max={100}
              step={1}
              value={variables.gasUsageOfficePerM2M3PerYear}
              onChange={handleInputChangeSlider('gasUsageOfficePerM2M3PerYear')}
              label="Gasverbruik ateliers per m&sup2; per jaar"
            />
          ),
        },
        {
          name: 'gasCostM3',
          render: () => (
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={variables.gasCostM3}
              onChange={handleInputChangeSlider('gasCostM3')}
              label="Gaskosten per m&sup3;"
            />
          ),
        },
        {
          name: 'electricityUsageCateringPerM2kWhPerYear',
          render: () => (
            <Slider
              min={0}
              max={400}
              step={5}
              value={variables.electricityUsageCateringPerM2kWhPerYear}
              onChange={handleInputChangeSlider(
                'electricityUsageCateringPerM2kWhPerYear',
              )}
              label="Electriciteitverbruik horeca per m&sup2; per jaar"
            />
          ),
        },
        {
          name: 'electricityUsageOfficePerM2kWhPerYear',
          render: () => (
            <Slider
              min={0}
              max={400}
              step={5}
              value={variables.electricityUsageOfficePerM2kWhPerYear}
              onChange={handleInputChangeSlider(
                'electricityUsageOfficePerM2kWhPerYear',
              )}
              label="Electriciteitverbruik ateliers per m&sup2; per jaar"
            />
          ),
        },
        {
          name: 'electricityCostkWh',
          render: () => (
            <Slider
              min={0}
              max={1}
              step={0.001}
              value={variables.electricityCostkWh}
              onChange={handleInputChangeSlider('electricityCostkWh')}
              label="Kosten per kWh"
            />
          ),
        },
      ],
    },
    {
      type: 'Juridisch',
      items: [
        {
          name: 'exploitationOutsideOmgevingsplan',
          render: () => (
            <Slider
              min={0}
              max={20000}
              step={1000}
              value={variables.exploitationOutsideOmgevingsplan}
              onChange={handleInputChangeSlider(
                'exploitationOutsideOmgevingsplan',
              )}
              label="Vergunning exploitatie buiten omgevingsplan"
            />
          ),
        },
        {
          name: 'exploitationPermitWithoutTerrarsse',
          render: () => (
            <Slider
              min={0}
              max={4000}
              step={100}
              value={variables.exploitationPermitWithoutTerrarsse}
              onChange={handleInputChangeSlider(
                'exploitationPermitWithoutTerrarsse',
              )}
              label="Horeca vergunning"
            />
          ),
        },
        {
          name: 'notaris',
          render: () => (
            <Slider
              min={150}
              max={1500}
              step={10}
              value={variables.notaris}
              onChange={handleInputChangeSlider('notaris')}
              label="Notaris kosten"
            />
          ),
        },
        {
          name: 'accountant',
          render: () => (
            <Slider
              min={300}
              max={1300}
              step={1}
              value={variables.accountant}
              onChange={handleInputChangeSlider('accountant')}
              label="Accountant"
            />
          ),
        },
        {
          name: 'registrationStockHolders',
          render: () => (
            <Slider
              min={20}
              max={50}
              step={1}
              value={variables.registrationStockHolders}
              onChange={handleInputChangeSlider('registrationStockHolders')}
              label="Aandeelhouder registratie"
            />
          ),
        },
        {
          name: 'taxationNumber',
          render: () => (
            <Slider
              min={90}
              max={150}
              step={10}
              value={variables.taxationNumber}
              onChange={handleInputChangeSlider('taxationNumber')}
              label="BTW-nummer"
            />
          ),
        },
        {
          name: 'registerChamberOfCommerce',
          render: () => (
            <Slider
              min={50}
              max={150}
              step={10}
              value={variables.registerChamberOfCommerce}
              onChange={handleInputChangeSlider('registerChamberOfCommerce')}
              label="Registratie KvK"
            />
          ),
        },
        {
          name: 'uboRegistration',
          render: () => (
            <Slider
              min={20}
              max={50}
              step={1}
              value={variables.uboRegistration}
              onChange={handleInputChangeSlider('uboRegistration')}
              label="Ubo Registratie"
            />
          ),
        },
        {
          name: 'supervisionFireSafety',
          render: () => (
            <Slider
              min={0}
              max={10}
              step={0.01}
              value={variables.supervisionFireSafety}
              onChange={handleInputChangeSlider('supervisionFireSafety')}
              label="Toezicht brandveiligheid"
            />
          ),
        },
        {
          name: 'permitOutsideOmgevingsplan',
          render: () => (
            <Slider
              min={0}
              max={10}
              step={0.01}
              value={variables.permitOutsideOmgevingsplan}
              onChange={handleInputChangeSlider('permitOutsideOmgevingsplan')}
              label="Afwijken omgevingsplan"
            />
          ),
        },
      ],
    },
  ];

  const handleRowChange = (
    index: number,
    field: keyof RowData,
    value: number,
  ) => {
    const newRows = [...rows];
    let row = newRows[index];
    (row[field] as number) = value;
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

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black p-3.5 lg:p-6">
            <div className="flex h-10 flex-row items-center justify-start">
              <Button>
                <ShareIcon onClick={shareURL} className="h-5 w-5" />
              </Button>
              <span
                className={clsx(
                  'ml-3 w-fit animate-pulse rounded-md bg-slate-500 px-3 py-2 text-white',
                  copied ? 'inline-block' : 'hidden',
                )}
              >
                Gekopieerd
              </span>
            </div>
          </div>
        </div>

        {variablesInputConfig.map((config) => (
          <div
            key={config.type}
            className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20"
          >
            <div className="rounded-lg bg-black p-3.5 lg:p-6">
              <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">{config.type}</h1>
                <div className="space-y-4">
                  {config.items.map((configItem) => {
                    return (
                      <div key={configItem.name}>{configItem.render()}</div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div
          key="table"
          className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20"
        >
          <div className="rounded-lg bg-black p-3.5 lg:p-6">
            <div className="py-5">
              <Button onClick={addRow}>Voeg regel toe</Button>
            </div>
            <table className="min-w-full bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Totaal</th>
                  <th className="px-4 py-2">min. horeca</th>
                  <th className="px-4 py-2">% horeca</th>
                  <th className="px-4 py-2">% overig</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">
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
                    <td className="px-4 py-2">
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
                    <td className="px-4 py-2">
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
                    <td className="px-4 py-2">
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
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="my-5 px-2">
              <span className="text-sm">
                De berekening prioriteert het poppodium. Hierbij vergelijkt hij
                wat het grootste oppervlakte geeft, het minimum of de
                procentuele toewijzing binnen het gebouw. Vervolgens wordt de
                rest ruimte verdeeld tussen overig en daadwerkelijk ateltier
                oppervlakte.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-5">
        {rows.map((row, index) => (
          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black p-3.5 lg:p-6">
              <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">
                  {row.totalSize}m&sup2;
                </h1>
                <Costs
                  key={index}
                  ExogenousVariables={variables}
                  rowVariables={row}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
