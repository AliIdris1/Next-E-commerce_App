'use client';
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");
console.log("clientId:", process.env.NEXT_PUBLIC_WIX_ID); // Should log the clientId
console.log("refreshToken:", refreshToken);

const WixClient = createClient({
    modules: {
      products,
      collections,
      currentCart
    },
    auth: OAuthStrategy({
      clientId: "21a6cf81-6bcc-441f-b205-114a0e4ccbfe",
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
});

export type WixClient = typeof WixClient;

export const WixClientContext = createContext<WixClient>(WixClient);

export const WixClientContextProvider = ({ children }: { children: ReactNode }) => {
  return <WixClientContext.Provider value={WixClient}>{children}</WixClientContext.Provider>;
};
