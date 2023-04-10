import "@/styles/globals.css";
import { useState, useEffect } from "react";
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    SignIn,
} from "@clerk/nextjs";
import { useRouter } from "next/router";

//  List pages you want to be publicly accessible, or leave empty if
//  every page requires authentication. Use this naming strategy:
//   "/"              for pages/index.js
//   "/foo"           for pages/foo/index.js
//   "/foo/bar"       for pages/foo/bar.js
//   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]"];
const localization = {
    socialButtonsBlockButton: "Sign In with {{provider|titleize}}",
};

export default function MyApp({ Component, pageProps }) {
    // Get the pathname
    const { pathname } = useRouter();

    // Check if the current route matches a public page
    const isPublicPage = publicPages.includes(pathname);

    // If the current route is listed as public, render it directly
    // Otherwise, use Clerk to require authentication
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
                        <SignIn localization={localization} />
                    </SignedOut>
                </>
            )}
        </ClerkProvider>
    );
}
