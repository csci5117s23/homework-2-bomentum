import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { updateItem } from '@/modules/data';

export function DoneButton({ id, item, changeDone, value }) {
    //Clerk
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    //React states
    const [change, setChange] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function process() {
            if (changeDone) {
                //From CLERK JWT templates for authentication
                const token = await getToken({ template: 'todo' });
                setLoading(false);
            }
        }
        [isLoaded];

        process();
    });

    async function changeButton() {
        const token = await getToken({ template: 'todo' });
        const getDone = await updateItem(userId, id, item, changeDone, token);
        setChange(false);
        setLoading(false);
    }

    return (
        <>
            <button type='button' className='doneButton' onClick={changeButton}>
                {value}
            </button>
        </>
    );
}
