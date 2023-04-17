import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from "react";
import { updateItem } from "@/modules/data";

export function DoneButton({ done, id, item }) {
  console.log("in button", done);
  console.log("in button", id);
    
  //Clerk
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  
  //React states
  const [change, setChange] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function process() {
      if (done) {
        //From CLERK JWT templates for authentication
        const token = await getToken({ template: "todo" });
        console.log("useEffect token:", token);
        setLoading(false);
      }
    } [isLoaded];
  
    process();
  })
  
  async function changeButton() {
        const token = await getToken({ template: "todo" });
        console.log("useEffect token:", token);
        const getDone = await updateItem(userId, done, id, item, token);
        console.log("getDone: ", getDone);
        console.log("before setting done: ");
      setChange(false);
      setLoading(false);
  }
    
 
  return (
    <button
      
      type="button"
      className='doneButton'
      onClick={changeButton}
    >
      {(false) ? <>Complete</> : <>Not Completed</>}
    </button>
  )
}