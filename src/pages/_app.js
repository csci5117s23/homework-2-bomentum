import "@/styles/globals.css";
// import { useState, useEffect } from "react";
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    SignIn,
} from "@clerk/nextjs";
import { useRouter } from "next/router";

// If the current route is listed as public, render it directly
// Otherwise, use Clerk to require authentication
//  Only home page and sign-in page public
const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]", "/"];

export default function MyApp({ Component, pageProps }) {
    // Get the pathname
    const { pathname } = useRouter();

    // Check if the current route matches a public page
    const isPublicPage = publicPages.includes(pathname);

    return (
        <ClerkProvider {...pageProps}>
            {isPublicPage ? (
                <Component {...pageProps} />
            ) : (
                <>
                    <SignedIn>
                        <UserButton />
                        <Component {...pageProps} />
                    </SignedIn>
                    <SignedOut>
                        <SignIn />
                    </SignedOut>
                </>
            )}
        </ClerkProvider>
    );
}
