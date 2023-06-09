//Display To-Do item details
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@clerk/clerk-react';
import { oneItem, updateItem } from '@/modules/data';
import { useState, useEffect } from 'react';
import { DoneButton } from '../../components/donebutton';

export default function Id() {
    //Next
    const router = useRouter();
    const { id } = router.query;

    //Clerk
    const { isLoaded, userId, getToken } = useAuth();

    //React
    const [itemId, setItemId] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInput, setUserInput] = useState();

    useEffect(() => {
        async function fetchOne() {
            if (userId) {
                //From CLERK JWT templates for authentication
                const token = await getToken({ template: 'todo' });
                const getItem = await oneItem(userId, { id }, token);
                setItemId(getItem);
                setLoading(false);
            }
        }
        fetchOne();
    }, [isLoaded, userInput]);

    function getInput(e) {
        e.preventDefault();
        setUserInput(e.target.value);
    }

    if (loading) {
        return <span>loading .......</span>;
    } else {
        if (id && itemId.length > 0) {
            return (
                <div>
                    <h3># {id}</h3>
                    <div className='updateItem'>
                        {itemId.map((todo) => (
                            <div key={todo._id}>
                                <p>
                                    <form contentEditable={true}>
                                        <textarea
                                            className='textGrow'
                                            onChange={getInput}
                                            rows={7}
                                            cols={100}>
                                            {todo.item}
                                        </textarea>
                                    </form>
                                    <DoneButton
                                        id={todo._id}
                                        item={userInput}
                                        changeDone={false}
                                        value='Update'
                                    />
                                    <DoneButton
                                        id={todo._id}
                                        item={userInput}
                                        changeDone={true}
                                        value='Complete'
                                    />
                                </p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <br></br>
                        <br></br>
                        <Link href='/todos'> Back to To-Do List</Link>
                    </div>
                </div>
            );
        } else {
            return (
                <>
                    <h1>No To-Do Item Found for {id}</h1>
                    <h2>
                        <br></br>
                        <br></br>
                        <Link href='/'>Back to To-Do List </Link>
                    </h2>
                </>
            );
        }
    }
}
