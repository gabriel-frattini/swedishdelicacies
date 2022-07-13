import * as React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import isEqual from 'lodash.isequal';

import { GetStaticPaths, GetStaticProps } from 'next';

import { Layout } from '@/components/layout';
import { StoreContext } from '@/context/store-context';
import { AddToCart } from '@/components/add-to-cart';
import { NumericInput } from '@/components/numeric-input';
import { formatPrice } from '@/utils/format-price';
import { Seo } from '@/components/seo';

import { CgChevronRight as ChevronIcon } from 'react-icons/cg';

import styles from '../product-page.module.css';

import { getAllCollections, getSingleProductByHandle } from '@/lib/queries';

import { AllCollectionsType, SingleProductType } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

export default function Product({ collections }: any) {
  const router = useRouter();

  const { data, isLoading } = useQuery(
    'getSingleProductByHandle',
    async () =>
      await getSingleProductByHandle(router.query.productHandle as string),
    {
      onSuccess(data) {
        console.log('finished', data);
      },
    },
  );

  if (isLoading) {
    return (
      <Layout collections={collections}>
        <></>
      </Layout>
    );
  }

  const {
    variants,
    priceRangeV2,
    title,
    description,
    images,
    id,
    options,
    collections: productCollection,
    handle,
    vendor,
    tags,
  }: SingleProductType = data;
  console.log('data', data);
  const { client } = React.useContext(StoreContext);

  const [variant, setVariant] = React.useState(
    variants && {
      ...variants.edges[0].node,
    },
  );
  const [quantity, setQuantity] = React.useState(1);

  const productVariant = client.product.variantForOptions(data, {}) || variant;

  const [available, setAvailable] = React.useState(productVariant.available);

  const checkAvailablity = React.useCallback(
    (productId: any) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.id,
          ) ?? [];

        if (result.length > 0) {
          setAvailable(result[0].available);
        }
      });
    },
    [productVariant.id, client.product],
  );

  const handleOptionChange = (index: any, event: any) => {
    const value = event.target.value;

    if (value === '') {
      return;
    }

    const currentOptions = [variant.selectedOptions];

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    };

    const selectedVariant = variants.edges.find((variant) => {
      return isEqual(currentOptions, variant.node.selectedOptions);
    });

    setVariant({ ...selectedVariant!.node });
  };

  React.useEffect(() => {
    checkAvailablity(data.storefrontId);
  }, [productVariant.id, checkAvailablity, id]);

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    parseInt(variant.price),
  );

  const hasVariants = variants.edges.length > 1;
  const hasImages = images.edges.length > 0;
  const hasMultipleImages = true || images.edges.length > 1;

  return (
    <Layout collections={collections}>
      <div className={styles.container}>
        <div className={styles.productBox}>
          {hasImages && (
            <div className={styles.productImageWrapper}>
              <div
                role="group"
                aria-label="gallery"
                aria-describedby="instructions"
              >
                <ul className={styles.productImageList}>
                  {images.edges.map((image, index) => (
                    <li
                      key={`product-image-${image.node.id}`}
                      className={styles.productImageListItem}
                    >
                      <Image
                        objectFit="contain"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        alt={
                          image.node.altText
                            ? image.node.altText
                            : `Product Image of ${title} #${index + 1}`
                        }
                        src={image.node.originalSrc}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              {hasMultipleImages && (
                <div className={styles.scrollForMore} id="instructions">
                  <span aria-hidden="true">←</span> scroll for more{' '}
                  <span aria-hidden="true">→</span>
                </div>
              )}
            </div>
          )}
          {!hasImages && (
            <span className={styles.noImagePreview}>No Preview image</span>
          )}
          <div>
            <div className={styles.breadcrumb}>
              <Link href={productCollection.edges[0].node.handle}>
                {productCollection.edges[0].node.title}
              </Link>
              <ChevronIcon size={12} />
            </div>
            <h1 className={styles.header}>{title}</h1>
            <p className={styles.productDescription}>{description}</p>
            <h2 className={styles.priceValue}>
              <span>{price}</span>
            </h2>
            <fieldset className={styles.optionsWrapper}>
              {hasVariants &&
                options.map(({ id, name, values }, index) => (
                  <div className={styles.selectVariant} key={id}>
                    <select
                      aria-label="Variants"
                      onChange={(event) => handleOptionChange(index, event)}
                    >
                      <option value="">{`Select ${name}`}</option>
                      {values.map((value) => (
                        <option value={value} key={`${name}-${value}`}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </fieldset>
            <div className={styles.addToCartStyle}>
              <NumericInput
                aria-label="Quantity"
                onIncrement={() => setQuantity((q) => Math.min(q + 1, 20))}
                onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                onChange={(event: any) =>
                  setQuantity(event.currentTarget.value)
                }
                value={quantity}
                min="1"
                max="20"
              />
              <AddToCart
                variantId={productVariant.id}
                quantity={quantity}
                available={available}
              />
            </div>
            <div className={styles.metaSection}>
              <span className={styles.labelFont}>Type</span>
              <span className={styles.tagList}>
                <Link href={productCollection.edges[0].node.handle}>
                  {productCollection.edges[0].node.title}
                </Link>
              </span>
              <span className={styles.labelFont}>Tags</span>
              <span className={styles.tagList}>
                {tags.map((tag) => (
                  <Link href={`/search?t=${tag}`}>{tag}</Link>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const collections = await getAllCollections();

  return {
    props: { collections },
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};
