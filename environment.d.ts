declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SHOPIFY_STORE_URL: string;
      NEXT_PUBLIC_ENV: 'dev' | 'prod';
      NEXT_PUBLIC_SHOPIFY_SHOP_PASSWORD_DEV: string;
      NEXT_PUBLIC_SHOPIFY_PASSWORD_PROD: string;
      NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN_PROS: string;
      NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN_DEV: string;
    }
  }
}

export {};
