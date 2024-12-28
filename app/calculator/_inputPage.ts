              
              export default function Page() { 
                return (
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
               )}