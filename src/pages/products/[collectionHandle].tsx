import * as React from 'react';

import { Layout } from '@/components/layout';
import { ProductListing } from '@/components/product-listing';
import { Seo } from '@/components/seo';

import styles from './index.module.css';

import {
  getAllCollections,
  getAllProductsByHandle,
  getSingleProductByHandle,
} from '@/lib/queries';
import { AllCollectionsType, AllproductsByHandleType } from '@/lib/types';

import { GetStaticPaths, GetStaticProps } from 'next';
import { queryClient } from '@/lib/queryClient';
import { useRouter } from 'next/router';

export default function ProductTypeIndex({ data }: AllproductsByHandleType) {
  const router = useRouter();

  React.useEffect(() => {
    if (Object.keys(data).length > 0) {
      data.collectionByHandle.products.edges.forEach((product) => {
        const handle = product.node.handle;
        queryClient.prefetchQuery('getSingleProductByHandle', async () => {
          await getSingleProductByHandle(handle);
        });
      });
    }
    router.push('/404');
  }, []);

  if (Object.keys(data).length === 0 || router.isFallback) {
    return null;
  }

  const { collectionByHandle, collections } = data;

  return (
    <Layout collections={collections}>
      <h2 className={styles.subtitle}>{collectionByHandle.description}</h2>
      <h1 className={styles.title}>{collectionByHandle.title}</h1>

      <ProductListing products={collectionByHandle.products} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { edges }: AllCollectionsType = await getAllCollections();

  const paths = edges
    .filter((node) => node !== null)
    .map((param) => ({
      params: { collectionHandle: param.node.handle },
    }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const param = JSON.stringify(context.params).split(':')[1].slice(1, -2);

  try {
    const { data } = await getAllProductsByHandle(param);

    if (data) {
      return {
        props: { data },
      };
    }
    return {
      props: { data: {} },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { data: {} },
    };
  }
};
