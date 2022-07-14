import * as React from 'react';
import Client from 'shopify-buy';

import { LineItemsType } from '@/lib/types';

const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL,
  storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN_DEV,
});

interface defaultValuesType {
  didJustAddToCart: boolean;
  cart: any[];
  isOpen: boolean;
  loading: boolean;
  onOpen: () => void;
  onClose: () => void;
  addVariantToCart: (variantId: string, quantity: string) => {};
  removeLineItem: (checkoutID: string, lineItemID: string) => {};
  updateLineItem: (
    checkoutID: string,
    lineItemID: string,
    quantity: string,
  ) => {};
  client: any;
  checkout: {
    id: string;
    totalPrice: string;
    subtotalPrice: string;
    currencyCode: string;
    totalTax: string;
    lineItems: LineItemsType['lineItems'];
  };
}

const defaultValues = {
  didJustAddToCart: false,
  cart: [],
  isOpen: false,
  loading: false,
  onOpen: () => {},
  onClose: () => {},
  addVariantToCart: (variantId: any, quantity: string) => {},
  removeLineItem: (checkoutID: any, lineItemID: any) => {},
  updateLineItem: (checkoutID: any, lineItemID: any, quantity: string) => {},
  client,
  checkout: {
    lineItems: [],
  },
} as unknown as defaultValuesType;

export const StoreContext =
  React.createContext<defaultValuesType>(defaultValues);

const isBrowser = typeof window !== `undefined`;
const localStorageKey = `shopify_checkout_id`;

export const StoreProvider = ({ children }: any) => {
  const [checkout, setCheckout] = React.useState<any>(defaultValues.checkout);
  const [loading, setLoading] = React.useState(false);
  const [didJustAddToCart, setDidJustAddToCart] = React.useState(false);

  const setCheckoutItem = (checkout: any) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id);
    }

    setCheckout(checkout);
  };

  React.useEffect(() => {
  }, [checkout.lineItems]);

  React.useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null;

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID,
          );
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout);
            return;
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, '');
        }
      }

      const newCheckout = await client.checkout.create();
      setCheckoutItem(newCheckout);
    };

    initializeCheckout();
  }, []);

  const addVariantToCart = (variantId: string, quantity: string) => {
    setLoading(true);

    const checkoutID = checkout.id;

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    return client.checkout
      .addLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res);
        setLoading(false);
        setDidJustAddToCart(true);
        setTimeout(() => setDidJustAddToCart(false), 3000);
      });
  };

  const removeLineItem = (checkoutID: any, lineItemID: any) => {
    setLoading(true);

    return client.checkout
      .removeLineItems(checkoutID, [lineItemID])
      .then((res) => {
        setCheckout(res);
        setLoading(false);
      });
  };

  const updateLineItem = (
    checkoutID: any,
    lineItemID: any,
    quantity: string,
  ) => {
    setLoading(true);

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ];

    return client.checkout
      .updateLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res);
        setLoading(false);
      });
  };

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
        checkout,
        loading,
        didJustAddToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
