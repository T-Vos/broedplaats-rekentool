'use client';
import React, { useState } from 'react';
import { Slider } from '#/ui/slider';
import { RowData } from '#/lib/row';
import { defaultRows } from '../calculator/variables';
import { Costs } from './_cost';
import { ExogenousVariables } from '#/lib/variables';
import { receiveFullRowCalculation } from '../calculator/calculations';
import Button from '#/ui/button';

const page = () => {
  const [rows, setRows] = useState<RowData[]>(defaultRows);
  const [variables, setVariables] = useState<ExogenousVariables>({
    prijsPerVierkanteMeter: 1300,
    interestRate: 0.1,
    leningDuurJaren: 10,
    kostenVerbouwing: 500,
    financieringGemeenteVerbouwing: 350,
    percentageFundedLoan: 0.9,
    nonLoaninterestRate: 0.03,
    uboRegistration: 25,
    registerChamberOfCommerce: 80,
    taxationNumber: 105.5,
    registrationStockHolders: 25,
    exploitationPermitWithoutTerrarsse: 2200,
    accountant: 800,
    notaris: 750,
  });

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
              max={0.3}
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
              label="%-Banklening"
            />
          ),
        },
        {
          name: 'nonLoaninterestRate',
          render: () => (
            <Slider
              min={0}
              max={0.3}
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
      type: 'Jurridisch',
      items: [
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
              label="BTW nummber"
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
            <Button onClick={addRow}>Voeg regel toe</Button>
            <table className="min-w-full bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">m&sup2;</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
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
