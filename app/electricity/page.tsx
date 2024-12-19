import { PlusIcon } from '@heroicons/react/24/outline';
import electricity_data from './data.json';
import { mean, median, max, min, variance, log } from 'mathjs';
import HistogramWithDistribution from '#/ui/HistogramWithDistribution';
import SimpleBlock from '#/ui/simple-block';
import { subtle } from 'crypto';
export default function Page() {
  return (
    <>
      <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
        <div className="rounded-lg bg-black p-3.5 lg:p-6">
          <div className="space-y-9">
            <div className="prose prose-sm prose-invert max-w-none">
              <h1 className="text-xl font-bold">Data points</h1>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <SimpleBlock
                  mainText={<PlusIcon className="h-5 w-5" />}
                  subtleText="Add data point"
                  type="green"
                />
                {electricity_data.map((item, index) => {
                  return (
                    <SimpleBlock
                      key={index}
                      mainText={`${item.kWh} kWh`}
                      subtleText={`${item.Jaar} ${item.Maand}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
        <div className="rounded-lg bg-black p-3.5 lg:p-6">
          <div className="space-y-9">
            <div className="prose prose-sm prose-invert max-w-none">
              <h1 className="text-xl font-bold">Descriptive statistics</h1>
              <div className="mb-9 grid grid-cols-1 gap-5  lg:grid-cols-2">
                {[
                  { func: mean, label: 'Mean price kWh' },
                  { func: median, label: 'Median price kWh' },
                  { func: max, label: 'Maximum price kWh' },
                  { func: min, label: 'Minimum price kWh' },
                  { func: variance, label: 'Variance price kWh' },
                ].map(({ func, label }) => (
                  <SimpleBlock
                    key={label}
                    mainText={func(
                      electricity_data.map((x) => x.kWh),
                    ).toString()}
                    subtleText={label}
                  />
                ))}
              </div>
              <HistogramWithDistribution
                data={electricity_data.map((x) => x.kWh)}
                binCount={5}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
