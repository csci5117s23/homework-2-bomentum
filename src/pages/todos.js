//Used Various Nextjs documentation examples
import { useState, useEffect } from 'react';
import { addItem, loadNotDone } from '@/modules/data';
import { useAuth } from '@clerk/clerk-react';
import Link from 'next/link';

export default function ToDos() {
    const [todoItems, setToDoItems] = useState([]);
    const [loading, setLoading] = useState(true);

    //Clerk
    const { isLoaded, userId, isSignedIn, getToken } = useAuth();

    //Signed into Clerk? Don't really need this, BUT, added anyway
    if (!isLoaded || !isSignedIn) {
        // You can handle the loading or signed state separately
        return <div> NOT LOGGED IN. SHOW LOGIN PAGE. SOMETHING IS WRONG</div>;
    }

    // Get to do items that are false
    useEffect(() => {
        async function process() {
            if (userId) {
                try {
                    //From CLERK JWT templates for authentication
                    const token = await getToken({ template: 'todo' });
                    const items = await loadNotDone(userId, token);

                    setToDoItems(items);
                } catch (e) {
                    console.log('error in todos useEffect::', e.message);
                }
            }
            setLoading(false);
        }
        process();
    }, [todoItems]);

    async function handleSubmit(e) {
        e.preventDefault();
        const data = event.target.item.value;
        const token = await getToken({ template: 'todo' });

        try {
            console.log('token in handleSubmit: ', data);
            addItem(data, userId, token);
            setLoading(false);
        } catch (error) {
            console.log('Error in handleSubmit: ', error);
        }
    }

    if (loading) {
        return <span>loading .......</span>;
    } else {
        return (
            <>
                <h1>{todoItems.length} To-Do to Complete:</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        id='item'
                        placeholder='New To-Do Item'></input>
                    <button type='submit'>Add Task</button>
                </form>
                <div className='listoflist'>
                    <ul>
                        {todoItems.length >= 1 ? (
                            todoItems.map((todo) => (
                                <div className='singleLine' key={todo._id}>
                                    <Link href={`/todo/${todo._id}`}>
                                        {todo.item}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <h1>Nothing in To Do List</h1>
                        )}
                    </ul>
                </div>
            </>
        );
    }
}
