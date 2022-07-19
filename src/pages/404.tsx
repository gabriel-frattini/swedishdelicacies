import * as React from 'react';

import { Layout } from '../components/layout';
import { AllCollectionsType } from '@/lib/types';

import styles from './404.module.css';
import { getAllCollections } from '@/lib/queries';
import { object } from 'zod';
import NotFound from '@/components/404';

interface pageProps {
  collections: AllCollectionsType;
}

export default function NotFoundPage() {
  return <NotFound />;
}

// export async function getStaticProps() {
//   try {
//     const collections = await getAllCollections();
//     if (collections) {
//       return {
//         props: { collections },
//       };
//     }
//     return {
//       props: { collections: {} },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: { collections: {} },
//     };
//   }
// }
