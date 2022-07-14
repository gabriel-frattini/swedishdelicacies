import { useServerSideShopify, useShopify } from '../shopifyClient';
import { AllCollectionsType, AllProductsType, variableProps } from '../types';

export async function getAllProducts() {
  const query = `
  {
   collections(first: 20) {
    edges {
      node {
        handle
        id
      }
    }
  }
  products(first: 25) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
      id
      title
      handle
      description
      collections(first:1) {
          edges {
              node {
                  handle
              }
          }
      }
      images(first: 5) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              } 
      priceRange{
          maxVariantPrice {
              amount
              currencyCode
          }
          minVariantPrice {
              amount 
              currencyCode
          }
      }
          variants(first: 5) {
          edges {
              node {
                  id 
                  title 
                  price
                  availableForSale
                  selectedOptions {
                      name
                      value
                  }
              }
          }
      } 
      }
    }
  }
}
`;

  const data = await useServerSideShopify(query, { variables: {} });
  return data;
}

export async function getAllProductsByHandle(handle: string) {
  const query = `

query getAllProductsByHandle($handle: String!) {
  collections(first: 20) {
    edges {
      node {
        handle
        id
      }
    }
  }
  collectionByHandle(handle: $handle) {
    title
    handle
    description
    products(first: 10) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
      edges {
        cursor
        node {
        id
        title
        handle
        description
        vendor
        collections(first:1) {
                  edges {
                      node {
                          handle
                      }
                  }
              }
        images(first: 5) {
                  edges {
                    node {
                      originalSrc
                      altText
                    }
                  }
                } 
        priceRange{
            maxVariantPrice {
                amount
                currencyCode
            }
            minVariantPrice {
                amount 
                currencyCode
            }
        }
        variants(first: 10) {
        edges {
          node {
            id  
            title 
            price    
            availableForSale
                  selectedOptions {
                      name
                      value
                  }     
                }
              }
            }   
          }
        }
      }
    }
  }
`;
  const data = await useServerSideShopify(query, {
    variables: {
      handle: handle,
    },
  });

  return data;
}

export async function getSingleProductByHandle(handle: string) {
  const query = `
   query getProductByHandle($handle: String!) {
    
    productByHandle(handle: $handle) {
    
      id
      title
      handle
      description
      tags
      options {
          id
          name
          values
      }
      collections(first:1) {
          edges {
              node {
                  handle
                  title
              }
          }
      }
      images(first: 5) {
                edges {
                  node {
                    id
                    originalSrc
                    altText
                  }
                }
              } 
      priceRange{
          maxVariantPrice {
              amount
              currencyCode
          }
          minVariantPrice {
              amount 
              currencyCode
          }
      }
          variants(first: 10) {
              nodes {
                  id 
                  title 
                  price
                  availableForSale
                  selectedOptions {
                      name
                      value
                  }
          }
      }
   
  }
}
`;
  const { data } = await useShopify(query, {
    variables: {
      handle,
    },
  });
  return data;
}

export async function getAllCollections() {
  const query = `
  {
  collections(first: 20) {
        edges {
          node {
            id
            handle
          }
        }
      }  
    }
  `;

  const {
    data: {
      collections: { edges },
    },
  } = await useServerSideShopify(query, { variables: {} });
  return { edges };
}

export async function getProductsFromQuery({ variables }: variableProps) {
  const query = `
  query ($query: String!, $sortKey: ProductSortKeys, $first: Int, $last: Int, $after: String, $before: String) {
  products(
    query: $query
    sortKey: $sortKey
    first: $first
    last: $last
    after: $after
    before: $before
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
      id
      title
      handle
      description
      tags
      options {
          id
          name
          values
      }
      collections(first:1) {
          edges {
              node {
                  handle
                  title
              }
          }
      }
      images(first: 5) {
                edges {
                  node {
                    id
                    originalSrc
                    altText
                  }
                }
              } 
      priceRange{
          maxVariantPrice {
              amount
              currencyCode
          }
          minVariantPrice {
              amount 
              currencyCode
          }
      }
          variants(first: 10) {
              nodes {
                  id 
                  title 
                  price
                  availableForSale
                  selectedOptions {
                      name
                      value
                  }
          }
      }
          }
        }
      }
    }

`;

  const { data } = await useShopify(query, {
    variables,
  });

  return data;
}

export async function getAllProductsWithMetaFields() {
  const query = `
{
   collections(first: 20) {
    edges {
      node {
        handle
      }
    }
  }
  products(first: 25) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
      id
      title
      handle
      description
      collections(first:1) {
          edges {
              node {
                  handle
              }
          }
      }
      images(first: 5) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              } 
      priceRange{
          maxVariantPrice {
              amount
              currencyCode
          }
          minVariantPrice {
              amount 
              currencyCode
          }
      }
          variants(first: 5) {
          edges {
              node {
                  id 
                  title 
                  price
                  availableForSale
                  selectedOptions {
                      name
                      value
                  }
              }
          }
      } 
      }
    }
  }

  shop{
    productTags(first: 100){
      edges{
        node
      }
    }
    productTypes(first:100) {
        edges {
            node 
        }
    }
    productVendors(first:100) {
        edges {
            node
        }
    }
  }
}
`;

  const data = await useServerSideShopify(query, { variables: {} });

  return data;
}
