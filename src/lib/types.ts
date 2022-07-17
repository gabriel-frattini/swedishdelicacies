import {  z } from 'zod';

const collections = z.object({
  edges: z.array(
    z.object({
      node: z.object({
        id: z.string(),
        handle: z.string(),
        products: z.object({
          edges: z.array(
            z.object({
              node: z.object({
                id: z.string(),
                handle: z.string(),
              }),
            }),
          ),
        }),
      }),
    }),
  ),
});

export type AllCollectionsType = z.infer<typeof collections>;

const pageInfo = z.object({
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

const node = z.object({
  id: z.string(),
  title: z.string(),
  handle: z.string(),
  vendor: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  options: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      values: z.array(z.string()),
    }),
  ),
  compareAtPriceRange: z.object({
    minVariantPrice: z.object({
      amount: z.string(),
      currencyCode: z.string(),
    }),
    maxVariantPrice: z.object({
      amount: z.string(),
      currencyCode: z.string(),
    }),
  }),
  priceRange: z.object({
    minVariantPrice: z.object({
      amount: z.string(),
      currencyCode: z.string(),
    }),
    maxVariantPrice: z.object({
      amount: z.string(),
      currencyCode: z.string(),
    }),
  }),
  priceRangeV2: z.object({
    minVariantPrice: z.object({
      amount: z.string(),
      currencyCode: z.string(),
    }),
    maxVariantPrice: z.object({
      amount: z.string(),
      currencyCode: z.string(),
    }),
  }),
  images: z.object({
    edges: z.array(
      z.object({
        node: z.object({
          id: z.string(),
          originalSrc: z.string(),
          altText: z.string(),
        }),
      }),
    ),
  }),
  collections: z.object({
    edges: z.array(
      z.object({
        node: z.object({
          id: z.string(),
          handle: z.string(),
          title: z.string(),
        }),
      }),
    ),
  }),
  variants: z.object({
    nodes: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        price: z.string(),
        availableForSale: z.boolean(),
        selectedOptions: z.object({
          name: z.string(),
          value: z.string(),
        }),
      }),
    ),
  }),
});

export type SingleProductType = z.infer<typeof node>;

const AllProducts = z.object({
  data: z.object({
    collections,
    products: z.object({
      pageInfo,
      edges: z.array(
        z.object({
          cursor: z.string(),
          node,
        }),
      ),
    }),
  }),
});

export type AllProductsType = z.infer<typeof AllProducts>;

const AllproductsByHandle = z.object({
  data: z.object({
    collections,
    collectionByHandle: z.object({
      id: z.string(),
      description: z.string().optional(),
      title: z.string(),
      handle: z.string(),
      products: z.object({
        pageInfo,
        edges: z.array(
          z.object({
            node,
          }),
        ),
      }),
    }),
  }),
});
export type AllproductsByHandleType = z.infer<typeof AllproductsByHandle>;

export interface variableProps {
  variables: {
    handle?: string;
    query?: string;
    sortKey?: string;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
  };
}

const lineItemObj = z.object({
  item: z.object({
    id: z.string(),
    hasNextPage: z.object({
      value: z.boolean(),
    }),
    hasPreviousPage: z.object({
      value: z.boolean(),
    }),
    quantity: z.number(),
    refetchQuery: z.function(),
    title: z.string(),
    variant: z.object({
      available: z.boolean(),
      compareAtPrice: z.string(),
      id: z.string(),
      image: z.object({
        altText: z.string(),
        height: z.number(),
        width: z.number(),
        id: z.string(),
        src: z.string(),
      }),
      priceV2: z.object({
        amount: z.string(),
        currencyCode: z.string(),
      }),
      title: z.string(),
    }),
  }),
});

export type SingleLineItemType = z.infer<typeof lineItemObj>;

const lineItemsObj = z.object({
  lineItems: z.array(
    z.object({
      id: z.string(),
      hasNextPage: z.object({
        value: z.boolean(),
      }),
      hasPreviousPage: z.object({
        value: z.boolean(),
      }),
      quantity: z.number(),
      refetchQuery: z.function(),
      title: z.string(),
      variant: z.object({
        available: z.boolean(),
        compareAtPrice: z.string(),
        id: z.string(),
        image: z.object({
          altText: z.string(),
          height: z.number(),
          width: z.number(),
          id: z.string(),
          src: z.string(),
        }),
        priceV2: z.object({
          amount: z.string(),
          currencyCode: z.string(),
        }),
        price: z.object({
          amount: z.string(),
          currencyCode: z.string(),
        }),
        title: z.string(),
      }),
    }),
  ),
});

export type LineItemsType = z.infer<typeof lineItemsObj>;

const shop = z.object({
  allProductTypes: z.object({
    edges: z.array(z.object({ node: z.string() })),
  }),

  allTags: z.object({
    edges: z.array(z.object({ node: z.string() })),
  }),
  allVendors: z.object({
    edges: z.array(
      z.object({
        node: z.string(),
      }),
    ),
  }),
});

export type ShopType = z.infer<typeof shop>;
