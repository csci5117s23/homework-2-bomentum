import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { loadDone } from '@/modules/data';

export default function Done() {
    //Clerk
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    //React
    const [done, setDone] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDone() {
            if (userId) {
                //From CLERK JWT templates for authentication
                const token = await getToken({ template: 'todo' });
                const getDone = await loadDone(userId, token);
                setDone(getDone);
                setLoading(false);
            }
        }
        fetchDone();
    }, [isLoaded]);

    if (loading) {
        return <span>loading .......</span>;
    } else {
        return (
            <>
                <h1>Completed Items: {done.length}</h1>
                {/* <h3>User:{userId}</h3> */}
                <div className='orderList'>
                    <ol>
                        {done.map((todo) => (
                            <h4 key={todo._id}>
                                <li>{todo.item}</li>
                            </h4>
                        ))}
                    </ol>
                </div>

                <div className='linklist'>
                    <Link href='/todos'>
                        <h2> Back to To-Do List</h2>
                    </Link>
                </div>
            </>
        );
    }
}
