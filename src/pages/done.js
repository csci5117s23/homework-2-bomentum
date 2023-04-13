import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { getFontDefinitionFromNetwork } from "next/dist/server/font-utils";

//Nextjs backend API endpoint and API token
//Note process.env only works on server-side, not client-side
const API_ENDPOINT = process.env.CODEHOOKS_ENDPOINT;
const API_KEY = process.env.CODEHOOKS_TOKEN;
const endpoint = process.env.JWT_ENDPOINT;
export default function Done() {
    //Clerk
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    //React
    const [loading, setLoading] = useState(true);
    const [done, setDone] = useState([]);

    useEffect(() => {
        async function fetchDone() {
            if (userId) {
                const token = await getToken({ template: "todo" });
                console.log("token:", token);
                const doneList = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer" + token,
                    },
                });
                if (doneList.ok) {
                    // const allDone = await list.json();
                }
                if (doneList.length > 0) {
                    return doneList[0];
                } else {
                    return null;
                }

                setDone(doneList);
            }
        }
        fetchDone();
    }, [isLoaded]);

    // // In case the user signs out while on the page.
    // if (!isLoaded) {
    //     return <div>User Logged Out</div>;
    // } else {
    //     return <div>Hello, USER: {userId}</div>;
    // }

    return (
        <>
            <h1>done list</h1>
            <h3>User:{userId}</h3>
            <Link href='/todos'>To Do</Link>
        </>
    );
}
