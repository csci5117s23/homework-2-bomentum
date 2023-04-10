import { useState } from "react";
import { useRouter } from "next/router";

export default function ToDos() {
  const [userInput, setUserInput] = useState("");
  const [todoList, setToDoList] = useState([]);
  // const [addItem, setAddItem] = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
    // console.log(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToDoList([userInput, ...todoList]);
    try {
      alert("Valid");
    } catch (error) {
      alert("Not Valid");
    }
  };

  return (
    <>
      <form className="pure-form">
        <input
          type="text"
          onChange={handleChange}
          placeholder="New To-Do Item"
        ></input>
        <button className="pure-button" onClick={handleSubmit}>
          Add
        </button>
      </form>
      <ul>
        {todoList.length >= 1 ? (
          todoList.map((todo, index) => {
            return <li key={index}>{todo}</li>;
          })
        ) : (
          <h1>Nothing in To Do List</h1>
        )}
      </ul>
    </>
  );
}
