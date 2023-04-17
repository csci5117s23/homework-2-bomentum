//Display To-Do item details
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from '@clerk/clerk-react';
import { oneItem, updateItem } from "@/modules/data";
import { useState, useEffect } from 'react';
import { DoneButton } from "../doneButton";


export default function Id() {

    //Next
    const router = useRouter();
    const { id } = router.query;

    //Clerk
    const { isLoaded, userId, getToken } = useAuth();
    //React
    const [itemId, setItemId] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchOne() {
            if (userId) {
                //From CLERK JWT templates for authentication
                const token = await getToken({ template: "todo" });
                console.log("useEffect token:", token);
                const getItem = await oneItem(userId, { id }, token);
                setItemId(getItem);
                setLoading(false);
                console.log("itemId: ", getItem);
                console.log("after set item id:", itemId);
            }
        }
        fetchOne();
    }, [isLoaded]);

    async function changeItem(e) {
            e.preventDefault();
        const data = e.currentTarget.value;
        console.log("change func", data);
            const token = await getToken({ template: 'todo' });

            try {
                console.log('token in handleSubmit: ',data);
                updateItem(data, userId, token);
                setItemId(updateItem);
                setLoading(false);
            } catch (error) {
                console.log('Error in handleSubmit: ', error);
            }
    }

    if (id) {
        return (
            <div>
                <p>To do for id # {id}</p>
                {/* <div className="singleItem">
                {itemId.map(todo => (
                    <div key={todo._id}>
                        <p><form contentEditable={true} >{todo.item}</form> <DoneButton done={todo.done.valueOf()} id={todo._id} item={todo.item} /> </p>
                </div>
                ))}
            </div> */}
                <Link href='/todos'>To Do</Link>
            </div>
        );
    } else {
        return <></>;
    }
}
