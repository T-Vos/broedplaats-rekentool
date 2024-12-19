export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const navigation: { name: string; items: Item[] }[] = [
  {
    name: 'Calculator',
    items: [
      {
        name: 'Calculator',
        slug: 'calculator',
        description:
          'Create a calculator for the profitability of a broedplaats',
      },
    ],
  },
  {
    name: 'Data',
    items: [
      {
        name: 'Electricity',
        slug: 'electricity',
        description: 'Get insights in the underlying electricity data',
      },
      {
        name: 'Gas',
        slug: 'gas',
        description: 'Get insights in the underlying gas data',
      },
    ],
  },
  {
    name: 'Visualization',
    items: [
      {
        name: 'Nested Layouts',
        slug: 'layouts',
        description: 'Create UI that is shared across routes',
      },
    ],
  },
];
