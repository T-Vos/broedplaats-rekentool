'use client';

import { useState } from 'react';

interface RowData {
  totalSize: number;
  minCatering: number;
  percCatering: number;
  percHalls: number;
  percArtStudios: number;
}

interface Assumptions {
  expectedIncomeCatering: number;
  expectedIncomeArtstudio: number;
}

const assumptions: Assumptions = {
  expectedIncomeCatering: 100, // Example value
  expectedIncomeArtstudio: 200, // Example value
};

export default function Page() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [rows, setRows] = useState<RowData[]>([]);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(Number(e.target.value));
  };

  const handleExpensesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenses(Number(e.target.value));
  };

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
        totalSize: 0,
        minCatering: 0,
        percCatering: 0,
        percHalls: 0,
        percArtStudios: 0,
      },
    ]);
  };

  const calculateExpectedIncome = (row: RowData) => {
    const cateringIncome =
      row.percCatering * assumptions.expectedIncomeCatering;
    const artStudioIncome =
      row.percArtStudios * assumptions.expectedIncomeArtstudio;
    return cateringIncome + artStudioIncome;
  };

  const profit = income - expenses;

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
              <p>Profit: {profit}</p>
              <h2 className="mt-6 text-lg font-bold">Expected Income Table</h2>
              <table className="min-w-full bg-gray-800 text-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Total Size</th>
                    <th className="px-4 py-2">Expected Income</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{row.totalSize}</td>
                      <td className="border px-4 py-2">
                        {calculateExpectedIncome(row)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
