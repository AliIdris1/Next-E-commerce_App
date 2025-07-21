import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { members} from "@wix/members"
import {cookies} from "next/headers"

export const wixClientServer = async() => {

    
    let refreshToken;
    try {
        const cookieStore = cookies()
        
        refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");
    } catch (error) {
        
    }
    
    const wixClient = createClient({
        modules: {
            products,
            collections,
            members
        },
        auth: OAuthStrategy({
            clientId: "21a6cf81-6bcc-441f-b205-114a0e4ccbfe",
            tokens: {
                refreshToken,
                accessToken: { value: "", expiresAt: 0 },
            },
        }),
    });

    return wixClient;
}