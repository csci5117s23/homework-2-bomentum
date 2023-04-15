import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { loadDone } from "@/modules/data";

export default function Done() {
    //Nextjs Public backend API endpoint and API token
    //Note process.env only works on server-side, not client-side
    const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    //Clerk
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    //React
    const [done, setDone] = useState([]);
    const [loading, setLoading] = useState(true);

    let doneList = [];

    useEffect(() => {
        async function fetchDone() {
            if (userId) {
                //From CLERK JWT templates for authentication
                const token = await getToken({ template: "todo" });
                // console.log("token:", token);
                const getDone = await loadDone(userId, token);
                // console.log("getDone: ", getDone);
                doneList = getDone;
                setDone(getDone);
                // console.log("done: ", done);
                setLoading(false);
            }
        }
        fetchDone();
    }, [isLoaded]);

    return (
        <>
            <h1>Completed Items: {done.length}</h1>
            <h3>User:{userId}</h3>
            <h3>{done[0].item}</h3 >
            <h3>{done[1].item}</h3 >

            <Link href='/todos'>To Do</Link>

        </>
    );
}
