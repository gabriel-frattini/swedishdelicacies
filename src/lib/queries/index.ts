import { useServerSideShopify, useShopify } from '../shopifyClient';
import { AllCollectionsType, AllProductsType } from '../types';

export async function getAllProducts() {
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
      priceRangeV2{
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

  const data = await useServerSideShopify(query);

  return data;
}

export async function getAllProductsByHandle(handle: string) {
  const query = `

query getAllProductsByHandle($handle: String!) {
  collections(first: 20) {
    edges {
      node {
        handle
      }
    }
  }
  collectionByHandle(handle: $handle) {
    title
    handle
    products(first: 10) {
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
        priceRangeV2{
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
  const response = await useServerSideShopify(query, {
    variables: {
      handle,
    },
  });

  return response;
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
`;
  return await useShopify(query, {
    variables: {
      handle,
    },
  });
}

export async function getAllCollections() {
  const query = `
  {
  collections(first: 20) {
        edges {
          node {
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
  } = await useServerSideShopify(query);

  return { edges };
}
