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
import { ProductPrice } from '@/components/product-price';

export interface OptionValue {
  name: string;
  option_id: string;
  value: any;
}

export default function Product({ collections }: any) {
  const router = useRouter();
  const { client } = React.useContext(StoreContext);
  const [quantity, setQuantity] = React.useState(1);
  const [variant, setVariant] = React.useState<any>();
  const [available, setAvailable] = React.useState<any>();

  const { data, isLoading, isError } = useQuery(
    'getSingleProductByHandle',
    async () =>
      await getSingleProductByHandle(router.query.productHandle as string),
  );

  React.useEffect(() => {
    if (data) {
      setVariant({ ...data.productByHandle.variants.nodes[0] });
    }
  }, [data]);

  if (isLoading || isError) {
    return (
      <Layout collections={collections}>
        <></>
      </Layout>
    );
  }

  if (data) {
    const { productByHandle } = data;
    const {
      variants: {
        nodes: [initialvariant],
      },
      variants,
      priceRange,
      title,
      description,
      images,
      id,
      options,
      collections: productCollection,
      compareAtPriceRange,
      handle,
      vendor,
      tags,
    }: SingleProductType = productByHandle;

    const handleOptionChange = (index: any, event: any) => {
      const value = event.target.value;

      if (value === '') {
        return;
      }

      const currentOptions = [...variant.selectedOptions];

      currentOptions[index] = {
        ...currentOptions[index],
        value,
      };

      const selectedVariant = variants.nodes.find((variant) => {
        return isEqual(currentOptions, variant.selectedOptions);
      });
      setVariant({ ...selectedVariant! });
    };

    // React.useEffect(() => {
    //   checkAvailablity(data.storefrontId);
    // }, [productVariant.id, checkAvailablity, id]);

    const hasVariants = variants.nodes.length > 1;
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
                          width={700}
                          height={500}
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
                <Link
                  replace
                  href={`/products/${productCollection.edges[0].node.handle}`}
                >
                  {productCollection.edges[0].node.title}
                </Link>
                <ChevronIcon size={12} />
              </div>
              <h1 className={styles.header}>{title}</h1>
              <p className={styles.productDescription}>{description}</p>
              <ProductPrice
                compareAtPriceRange={compareAtPriceRange}
                initialPrice={initialvariant.price}
              />
              <fieldset className={styles.optionsWrapper}>
                {hasVariants &&
                  options.map(({ id, name, values }, index) => (
                    <div className={styles.selectVariant} key={id}>
                      <select
                        aria-label="Variants"
                        onChange={(event) => handleOptionChange(index, event)}
                      >
                        <option value="">{`Select ${'Size' || name}`}</option>
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
                  variantId={variant && variant.id}
                  quantity={quantity}
                  available={true}
                  compareAtPriceRange={compareAtPriceRange}
                  initialPrice={initialvariant.price}
                />
              </div>
              <div className={styles.metaSection}>
                <div className={styles.metaShipping}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                      fill="#808080"
                    >
                      <path d="M5.85 19.55q-1.175 0-1.988-.812-.812-.813-.812-1.988h-1.7V6.3q0-.75.525-1.275Q2.4 4.5 3.15 4.5h13.625v3.8h2.65l3.225 4.325v4.125h-1.8q0 1.175-.825 1.988-.825.812-2 .812-1.15 0-1.975-.812-.825-.813-.825-1.988H8.65q0 1.175-.812 1.988-.813.812-1.988.812Zm0-1.5q.55 0 .925-.375t.375-.925q0-.55-.375-.925t-.925-.375q-.55 0-.925.375t-.375.925q0 .55.375.925t.925.375Zm12.2 0q.55 0 .925-.375t.375-.925q0-.55-.375-.925t-.925-.375q-.55 0-.937.375-.388.375-.388.925t.388.925q.387.375.937.375Zm-1.275-4.8h4.475l-2.6-3.45h-1.875Z" />
                    </svg>
                    <p className={styles.tagList}>
                      Free shipping for order over £60
                    </p>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                      fill="#808080"
                    >
                      <path d="M5.85 19.55q-1.175 0-1.988-.812-.812-.813-.812-1.988h-1.7V6.3q0-.75.525-1.275Q2.4 4.5 3.15 4.5h13.625v3.8h2.65l3.225 4.325v4.125h-1.8q0 1.175-.825 1.988-.825.812-2 .812-1.15 0-1.975-.812-.825-.813-.825-1.988H8.65q0 1.175-.812 1.988-.813.812-1.988.812Zm0-1.5q.55 0 .925-.375t.375-.925q0-.55-.375-.925t-.925-.375q-.55 0-.925.375t-.375.925q0 .55.375.925t.925.375Zm12.2 0q.55 0 .925-.375t.375-.925q0-.55-.375-.925t-.925-.375q-.55 0-.937.375-.388.375-.388.925t.388.925q.387.375.937.375Zm-1.275-4.8h4.475l-2.6-3.45h-1.875Z" />
                    </svg>
                    <p className={styles.tagList}>
                      Upd {'&'} Fedex 4-8 days £29
                    </p>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                      fill="#808080"
                    >
                      <path d="M5.85 19.55q-1.175 0-1.988-.812-.812-.813-.812-1.988h-1.7V6.3q0-.75.525-1.275Q2.4 4.5 3.15 4.5h13.625v3.8h2.65l3.225 4.325v4.125h-1.8q0 1.175-.825 1.988-.825.812-2 .812-1.15 0-1.975-.812-.825-.813-.825-1.988H8.65q0 1.175-.812 1.988-.813.812-1.988.812Zm0-1.5q.55 0 .925-.375t.375-.925q0-.55-.375-.925t-.925-.375q-.55 0-.925.375t-.375.925q0 .55.375.925t.925.375Zm12.2 0q.55 0 .925-.375t.375-.925q0-.55-.375-.925t-.925-.375q-.55 0-.937.375-.388.375-.388.925t.388.925q.387.375.937.375Zm-1.275-4.8h4.475l-2.6-3.45h-1.875Z" />
                    </svg>
                    <p className={styles.tagList}>
                      Express shipping 1-2 days £59{' '}
                    </p>
                  </div>
                </div>
                <div className={styles.metaProduct}>
                  <span className={styles.labelFont}>Type</span>
                  <span className={styles.tagList}>
                    <Link
                      replace
                      href={`/products/${productCollection.edges[0].node.handle}`}
                    >
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
        </div>
      </Layout>
    );
  }
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
    fallback: false, //indicates the type of fallback
  };
};
