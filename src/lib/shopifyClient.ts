import Client from 'shopify-buy';
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL;

// Initializing a client to return content in the store's primary language
export const client = Client.buildClient({
  domain,
  storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN_DEV,
});

interface variableProps {
  variables: {
    handle: string;
  };
}

export async function useServerSideShopify(
  query: any,
  variables?: variableProps,
) {
  const URL = `https://${domain}/admin/api/2022-07/graphql.json`;
  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token':
        process.env.NEXT_PUBLIC_SHOPIFY_SHOP_PASSWORD_DEV,

      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, ...variables }),
  };

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    throw new Error('Products not fetched');
  }
}

export async function useShopify(query: any, variables?: variableProps) {
  const URL = `https://${domain}/api/2022-07/graphql.json`;
  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token':
        process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN_DEV,

      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, ...variables }),
  };

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    throw new Error('Products not fetched');
  }
}
