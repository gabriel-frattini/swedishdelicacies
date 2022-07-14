import * as React from 'react';
import { AllproductsByHandleType } from '@/lib/types';
import { getAllProducts, getAllProductsByHandle } from '@/lib/queries';
import { GetStaticProps } from 'next';

import { Layout } from '../components/layout';
import { ProductListing } from '@/components/product-listing';
import styles from './index.module.css';

function Hero(props: any) {
  return (
    <div className={styles.container}>
      <h1 className={styles.intro}>
        Welcome to the Swedish Delicacies + anything Scandinavian. 🙂
      </h1>
      <>
        <p className={styles.callOut}>
          It’s a simple concept that started in our family house in Halmstad
          Sweden, with 1000+ products and 30k customers already. We share the
          best of Sweden and Scandianveinen heritage, foods and what we think is
          a must-try for anyone who wants to experience genuine sacandinavien
          culture. Hope you find something of likeing, let us know if there are
          any questions. I, my wife, and my 3 kids look forward to shipping your
          order. Hälsningar!
        </p>
      </>
    </div>
  );
}

export default function IndexPage({ data }: AllproductsByHandleType) {
  if (!Object.keys(data).length) {
    return null;
  }
  return (
    <Layout collections={data.collections}>
      <Hero />
      <ProductListing products={data.collectionByHandle.products} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getAllProductsByHandle('chocolate');

  if (data) {
    return {
      props: { data: data },
    };
  }
  return {
    props: { data: {} },
  };
};
