export interface DemoProject {
  id: string;
  imageUrl: string;
  demoUrl: string;
  label: string;
}

export const DEMOS: DemoProject[] = [
  {
    id: 'btp',
    label: 'Artisan BTP',
    imageUrl: '/demos/btp.jpeg',
    demoUrl: '/demos/modele-artisan-btp.html',
  },
  {
    id: 'sante',
    label: 'Santé Bien-être',
    imageUrl: '/demos/sante.jpeg',
    demoUrl: '/demos/modele-sante-bienetre.html',
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    imageUrl: '/demos/restaurant.jpeg',
    demoUrl: '/demos/modele-restaurant.html',
  },
  {
    id: 'conseil',
    label: 'Cabinet Conseil',
    imageUrl: '/demos/conseil.jpeg',
    demoUrl: '/demos/modele-cabinet-conseil.html',
  },
  {
    id: 'commerce',
    label: 'Commerce de proximité',
    imageUrl: '/demos/commerce.jpeg',
    demoUrl: '/demos/modele-commerce-proximite.html',
  },
];
