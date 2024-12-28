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
        name: 'Locatie kosten',
        slug: 'location-costs',
        description: 'Bereken de kosten voor de locatie',
      },
    ],
  },
  // {
  //   name: 'Data',
  //   items: [
  //     {
  //       name: 'Electricity',
  //       slug: 'electricity',
  //       description: 'Get insights in the underlying electricity data',
  //     },
  //     {
  //       name: 'Gas',
  //       slug: 'gas',
  //       description: 'Get insights in the underlying gas data',
  //     },
  //   ],
  // },
];
