//Display To-Do item details
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from '@clerk/clerk-react';
import { oneItem, updateItem } from "@/modules/data";
import { useState, useEffect } from 'react';
import { DoneButton } from "../../components/donebutton";


export default function Id() {

    //Next
    const router = useRouter();
    const { id } = router.query;

    //Clerk
    const { isLoaded, userId, getToken } = useAuth();
    //React
    const [itemId, setItemId] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemChange, setItemChange] = useState(true);
    const [state, setState] = useState();


    useEffect(() => {
        async function fetchOne() {
            if (userId) {
                //From CLERK JWT templates for authentication
                const token = await getToken({ template: "todo" });
                console.log("useEffect token:", token);
                const getItem = await oneItem(userId, { id }, token);
                setItemId(getItem);
                setLoading(false);
                setItemChange(false);
                console.log("itemId: ", getItem);
                console.log("after set item id:", itemId);
            }
        }
        fetchOne();
    }, [isLoaded, itemChange]);

    // async function getItem() {

    //     const data = e.currentTarget.value;
    //     console.log("change func", data);
    //     return data;
    // }

    if (id) {
        return (
            <div>
                <p>To do for id # {id}</p>
                <div className="singleItem">
                {itemId.map(todo => (
                    <div key={todo._id}>
                        <p><form contentEditable={true} onChange={(e)=>setState(e.target.value)}>{todo.item}</form> <DoneButton done={todo.done.valueOf()} id={todo._id} item={state} /> </p>
                </div>
                ))}
            </div>
                <Link href='/todos'>To Do</Link>
            </div>
        );
    } else {
        return <></>;
    }
}
