import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { loadDone } from "@/modules/data";

export default function Done() {
    //Clerk
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    //React
    const [done, setDone] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log("done waaaay before; ", done.length);


    useEffect(() => {
        async function fetchDone() {
            if (userId) {
                //From CLERK JWT templates for authentication
                const token = await getToken({ template: "todo" });
                console.log("useEffect token:", token);
                const getDone = await loadDone(userId, token);
                console.log("getDone: ", getDone);
                console.log("before setting done: ", done.length);
                setDone(getDone);
                console.log("after setting done: ", done.length);

                setLoading(false);
            }
        }
        fetchDone();
    }, [isLoaded]);

    return (
        <>
            <h1>Completed Items: {done.length}</h1>
            <h3>User:{userId}</h3>
            <div>
                {done.map(todo => (
                    <h4 key={todo._id}>
                        <p>{todo.item}</p>
                    </h4>
                ))}
            </div>
            

            <div className="linklist">
                <Link href='/todos'><h2>To Do List</h2></Link>
            </div>

        </>
    );
}
