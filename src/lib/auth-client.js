import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // If the auth backend is hosted on a separate server domain, 
    // make sure process.env.NEXT_PUBLIC_BETTER_AUTH_URL is defined.
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL, 
});

// DO NOT DESTRUCTURE HERE. 
// Export the client directly so sub-methods remain accessible.
