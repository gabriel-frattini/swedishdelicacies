import * as React from 'react';
import { useRouter } from 'next/router';
import isEqual from 'lodash.isequal';
import Image from 'next/image';
import Link from 'next/link';

import { Layout } from '@/components/layout';
import { AddToCart } from '@/components/add-to-cart';
import { NumericInput } from '@/components/numeric-input';
import { Seo } from '@/components/seo';
import { ProductPrice } from '@/components/product-price';

import { CgChevronRight as ChevronIcon } from 'react-icons/cg';
import { PaginationButton } from '@/icons/pagination';

import {
  AllCollectionsType,
  AllProductsType,
  SingleProductType,
} from '@/lib/types';
import { getAllProductHandles, getSingleProductByHandle } from '@/lib/queries';

import styles from './product-page.module.css';
import Reviews from '@/components/reviews';
import { GetStaticPaths, GetStaticProps } from 'next';
import NotFound from '@/components/404';

export interface OptionValue {
  name: string;
  option_id: string;
  value: any;
}

interface pageProps {
  data: {
    productByHandle: SingleProductType;
    collections: AllCollectionsType;
  };
}

export default function Product({
  data: { productByHandle, collections },
}: pageProps) {
  const router = useRouter();
  const [quantity, setQuantity] = React.useState(1);
  const [variant, setVariant] = React.useState<any>();

  const [viewActiveImage, setViewActiveImage] = React.useState<string>();

  if (Object.keys(productByHandle).length === 0) {
    return <NotFound />;
  }

  React.useEffect(() => {
    if (productByHandle) {
      setVariant({ ...productByHandle.variants.nodes[0] });
      setViewActiveImage(productByHandle.images.edges[0].node.id);
    }
  }, [productByHandle]);

  if (productByHandle) {
    const {
      variants: {
        nodes: [initialvariant],
      },
      variants,
      title,
      description,
      images,
      options,
      handle,
      collections: productCollection,
      compareAtPriceRange,
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
    const hasVariants = variants.nodes.length > 1;
    const hasImages = images.edges.length > 0;
    const hasMultipleImages = images.edges.length > 1;
    const collectionId = productCollection.edges.length
      ? productCollection.edges[0].node.id
      : '';
    return (
      <Layout collections={collections} activePage={collectionId}>
        <Seo
          title={title}
          description={description}
          pathname={`/product/${handle}`}
          image={images.edges[0].node.originalSrc}
        />
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
                        key={index}
                        className={`${
                          viewActiveImage === image.node.id
                            ? styles.activeImageListItem
                            : styles.inactiveImageListItem
                        }`}
                      >
                        <div className={styles.previous}>
                          <PaginationButton
                            show={hasMultipleImages}
                            className={styles.previousbutton}
                            onPress={() => {
                              index !== 0 &&
                                setViewActiveImage(
                                  images.edges[index - 1].node.id,
                                );
                            }}
                          />
                        </div>
                        <Image
                          width={700}
                          height={450}
                          quality={100}
                          objectFit="contain"
                          alt={
                            image.node.altText
                              ? image.node.altText
                              : `Product Image of ${title} #${index + 1}`
                          }
                          src={image.node.originalSrc}
                        />
                        <div className={styles.previous}>
                          <PaginationButton
                            show={hasMultipleImages}
                            className={styles.nextbutton}
                            onPress={() => {
                              index !== images.edges.length - 1 &&
                                setViewActiveImage(
                                  images.edges[index + 1].node.id,
                                );
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {!hasImages && (
              <span className={styles.noImagePreview}>No Preview image</span>
            )}
            <div className={styles.productInfo}>
              {productCollection.edges.length ? (
                <div className={styles.breadcrumb}>
                  <Link
                    replace
                    href={`/products/${productCollection.edges[0].node.handle}`}
                  >
                    {productCollection.edges[0].node.title}
                  </Link>
                  <ChevronIcon size={12} />
                </div>
              ) : null}
              <div className={styles.header}>
                <h1 className={styles.headerTitle}>{title}</h1>
                <h2 className={styles.headerRating}>
                  <svg
                    className={styles.stars}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                  <svg
                    className={styles.stars}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                  <p>1 review</p>
                </h2>
              </div>
              <p className={styles.productDescription}>{description}</p>
              <ProductPrice
                className={styles.priceValue}
                compareAtPriceRange={compareAtPriceRange}
                initialPrice={initialvariant.price}
              />
              <fieldset className={styles.optionsWrapper}>
                {hasVariants &&
                  options.map(({ id, name, values }, index) => (
                    <div className={styles.selectVariant} key={index}>
                      <select
                        aria-label="Variants"
                        onChange={(event) => handleOptionChange(index, event)}
                      >
                        <option value="">{`Select ${'Size' || name}`}</option>
                        {values.map((value, index) => (
                          <option value={value} key={index}>
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
                  disabled={false}
                  onIncrement={() => setQuantity((q) => Math.min(q + 1, 20))}
                  onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                  onChangeQuantity={(event: any) =>
                    setQuantity(event.currentTarget.value)
                  }
                  quantity={quantity}
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
                    <p className={styles.shipList}>
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
                    <p className={styles.shipList}>
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
                    <p className={styles.shipList}>
                      Express shipping 1-2 days £59{' '}
                    </p>
                  </div>
                </div>
                {productCollection.edges.length ? (
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
                      {tags.map((tag, idx) => (
                        <Link key={idx} href={`/search?t=${tag}`}>
                          <a>{tag} </a>
                        </Link>
                      ))}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* <Reviews /> */}
        </div>
      </Layout>
    );
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { products }: AllProductsType['data'] = await getAllProductHandles();

  const paths = products.edges
    .filter((node) => node !== null || Object.keys(node).length > 0)
    .map((param) => ({
      params: { productHandle: param.node.handle },
    }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return {
      props: { data: {} },
    };
  }
  const param = JSON.stringify(context.params).split(':')[1].slice(1, -2);

  try {
    const { data } = await getSingleProductByHandle(param);
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
