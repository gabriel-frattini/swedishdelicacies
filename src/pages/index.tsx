import * as React from 'react';
import { AllproductsByHandleType } from '@/lib/types';
import { getAllProducts, getAllProductsByHandle } from '@/lib/queries';

import { Layout } from '../components/layout';
import { ProductListing } from '@/components/product-listing';
import styles from './index.module.css';

function Hero(props: any) {
  return (
    <div className={styles.container}>
      <h1 className={styles.intro}>
        Welcome to the GatsbyJS + Shopify Demo Store.
      </h1>
      {!!process.env.GATSBY_DEMO_STORE && (
        <>
          <p className={styles.callOut}>
            It's a proof-of-concept in a box, with 10k products and 30k variants
            to help you get to proof-of-concept as soon as right now.
          </p>
          <p className={styles.callToAction}>
            Hook it up to your own Shopify store data and start customizing in
            minutes by deploying it to Gatsby Cloud for free. Grab your Shopify
            store credentials and
            <a href="https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-shopify&utm_campaign=shopify-starter">
              <img
                src="https://www.gatsbyjs.com/deploynow.png"
                alt="Deploy to Gatsby Cloud"
                className={styles.deployButton}
              />
            </a>
          </p>
        </>
      )}
    </div>
  );
}

export default function IndexPage({
  data: { collectionByHandle, collections },
}: AllproductsByHandleType) {
  return (
    <Layout collections={collections}>
      <Hero />
      {collectionByHandle && (
        <ProductListing products={collectionByHandle.products} />
      )}
    </Layout>
  );
}

export async function getStaticProps(context: any) {
  const { data } = await getAllProductsByHandle('startsida');

  return {
    props: { data },
  };
}
