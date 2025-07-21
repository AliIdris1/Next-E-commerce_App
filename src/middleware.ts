import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
    const cookies = request.cookies;
    const res = NextResponse.next();

    if (cookies.get("refreshToken")) {
        return res;
    }

    const wixClient = createClient({
        auth: OAuthStrategy({ clientId: "a9c4cf8e-7728-4694-d104-d49f6c06f6c4" })
    });

    try {
        const tokens = await wixClient.auth.generateVisitorTokens();
        res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            maxAge: 60 * 60 * 24 * 30,
        });
    } catch (error) {
        console.error('Error generating tokens:', error);
        // Handle the error appropriately
    }

    return res;
}
