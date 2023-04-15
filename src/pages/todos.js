//Used Various Nextjs documentation examples
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { addItem, loadNotDone } from '@/modules/data';
import { useAuth } from '@clerk/clerk-react';
import Todo from './todo/todo';

export default function ToDos() {
    const [userInput, setUserInput] = useState('');

    const [todoItems, setToDoItems] = useState([]);
    const [loading, setLoading] = useState(true);
    

    //Clerk
    const { isLoaded, userId, isSignedIn, getToken } = useAuth();

    //Signed into Clerk? Don't really need this, BUT, added anyway
    if (!isLoaded || !isSignedIn) {
        // You can handle the loading or signed state separately
        return <div> NOT LOGGED IN. SHOW LOGIN PAGE. SOMETHING IS WRONG</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { item: event.target.item.value };
        // const JSONdata = JSON.stringify(data);
        try {
            // console.log('data to addItem: ', data);
            addItem(JSON.stringify(data), (userId));
        } catch (error) {
            console.log('Error in handleSubmit: ', error);
        }
    };

    // Get to do items that are false
    useEffect(() => {
        async function process() {
            if (userId) {
                try {
                    //From CLERK JWT templates for authentication
                    const token = await getToken({ template: 'todo' });
                    const items = await loadNotDone(userId, token);
                    setToDoItems(items);

                    // console.log('todoItems: ', todoItems);
                    // console.log('items: ', items);
                } catch (e) {
                    console.log(e);
                }
                setLoading(false);
            }
        }
        process();
    }, [isLoaded]);

    if (loading) {
        return <span>loading .......</span>;
    } else {
        return (
            <>
                <h1>Hello {userId}</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        id='item'
                        placeholder='New To-Do Item'></input>
                    <button type='submit'>Add Task</button>
                </form>
                <ul>
                    <li>Items to complete: </li>
                    {todoItems.length >= 1 ?(
                        todoItems.map((todo) => {
                            // console.log("what ", todo.item)
                            return (<li>{todo.item}</li>)
                        })
                ) : 
                    <h1>Nothing in To Do List</h1>
                    }
                    <li>end</li>

            </ul>

            </>
        );
    }
}
