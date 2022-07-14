import { string, z } from 'zod';

const collections = z.object({
  edges: z.array(
    z.object({
      node: z.object({
        handle: z.string(),
        products: z.object({
          edges: z.array(
            z.object({
              node: z.object({
                handle: z.string(),
                id: z.string(),
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
      description: z.string(),
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
